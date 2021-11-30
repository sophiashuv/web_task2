import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Jobs from './models/job.js';

mongoose.connect('mongodb://localhost:27017/jobs');

const app = express()
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/jobs', async (req, res) => {
  const { limit = 50, status } = req.query;

  const filters = {};

  if(status){
    filters.status = status;
  }

  const jobs = await Jobs
    .find(filters)
    .sort({_id: -1})
    .limit(Number(limit));

  res.status(200).json({  jobs });
});

app.post('/jobs', async (req, res) => {
  const { text, timeout } = req.body;
  if (!text)
    return res.status(400).send('text required.');

  const job = await Jobs.create({
    text,
    timeout,
    status: 'pending',
  });

  res.status(200).json(job);
});

app.put('/jobs/:id', async (req, res) => {
  const id = req.params.id;
  const { status, output, error, time } = req.body;
  console.log({ status, output, error, time });

  const job = await Jobs.findOneAndUpdate({ _id: id }, { status, output, error, time }, {new: true})
  res.status(200).json(job);
});

app.use('/static', express.static('../output'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})