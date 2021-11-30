import { readFile } from 'fs/promises';
import fetch from 'node-fetch';

import { generateImage } from './text-to-image.js';


let inProgress = 0;
const jobsInterval = 1000;

setInterval(async () => {
  if (inProgress > 0)
    return;

  const job = await getNextJob();
  if (!job) {
    return;
  }

  try {
    inProgress++;
    await reportInProgress(job._id);
    const result = await runTextToImageJob(job);
    await reportDone(job._id, result);
  } catch (e) {
    await reportDone(job._id, e);
  } finally {
    inProgress--;
  }

}, jobsInterval)


async function runTextToImageJob(params) {
  let timeFinished;
  const timeStarted = Date.now();

  try {
    const result = await Promise.race([asyncTimeout(params.timeout), generateImage(params.text)]);
    timeFinished = Date.now();

    return {
      status: 'finished',
      time: timeFinished - timeStarted,
      output: result
    };

  } catch (e) {
    timeFinished = Date.now();
    if (e === 'timeout') {
      throw {
        status: 'timeout',
        time: timeFinished - timeStarted,
      };
    }
    throw {
      error: e.toString(),
      status: 'error',
      time: timeFinished - timeStarted,
    };
  }

}

async function getNextJob() {
  try {
    const response = await fetch('http://localhost:3001/jobs?status=pending&limit=1');
    const body = await response.json();
    return body.jobs[0];
  } catch (e) {

  }
}

function asyncTimeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout'), time);
  });
}

async function reportInProgress(jobId) {
  const params = { status: 'in-progress' };
  await fetch(`http://localhost:3001/jobs/${jobId}`, {
    method: 'put',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function reportDone(jobId, params) {
  await fetch(`http://localhost:3001/jobs/${jobId}`, {
    method: 'put',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  });
}

