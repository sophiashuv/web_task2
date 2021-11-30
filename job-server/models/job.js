import mongoose from 'mongoose';

export default mongoose.model('Job', {
  status: String,
  text: String,
  error: String,
  output: String,
  time: Number,
  timeout: Number,
});