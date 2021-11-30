import { Component } from 'react';
import { cancelJob, createJob, loadJobs } from '../api';


export class JobsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
    };

    this.loadJobs = this.loadJobs.bind(this);
    this.cancelJob = this.cancelJob.bind(this);
  }

  async loadJobs() {
    const jobs = await loadJobs();
    this.setState({ jobs: jobs })
  }

  cancelJob(jobId) {
    cancelJob(jobId);
  }

  componentDidMount() {
    setInterval(() => {
      this.loadJobs();
    }, 1000);
  }

  render() {
    return (
      <div>

        <br />

        {this.state.jobs.map((job) => (
          <div key={job._id}>
            <span>{job._id}</span> |
            <span>{job.status}</span> |

            {job.status === 'finished' && (
              <span>
                <a href={`http://localhost:3001/static/${job.output}`}>result</a>
              </span>
            )}
            {job.status === 'finished' && (<span>{job.time / 1000}s</span>)}
            {job.status === 'pending' && (<button onClick={() => this.cancelJob(job._id)}>Cancel</button>)}
          </div>
        ))}

      </div>
    );
  }
}
