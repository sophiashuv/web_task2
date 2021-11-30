export async function createJob(params){
  await fetch(`http://localhost:3001/jobs`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function loadJobs(){
  const response = await fetch(`http://localhost:3001/jobs`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  });

  const result = await response.json();
  return result.jobs;
}

export async function cancelJob(jobId){
  await fetch(`http://localhost:3001/jobs/${jobId}`, {
    method: 'put',
    body: JSON.stringify({ status: 'canceled'}),
    headers: { 'Content-Type': 'application/json' }
  });
}