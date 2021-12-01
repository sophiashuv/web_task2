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
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">status</th>
            <th scope="col"> </th>
          </tr>
          </thead>
          <tbody>
            {this.state.jobs.map((job, index) => (
                <tr key={job._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{job._id}</td>
                  <td>{job.status}</td>

                  {job.status === 'finished' && (
                      <td>
                <a href={`http://localhost:3001/static/${job.output}`}>result</a>
              </td>
                  )}
                  {job.status === 'finished' && (<span>{job.time / 1000}s</span>)}
                  {job.status === 'pending' && (<button onClick={() => this.cancelJob(job._id)}>Cancel</button>)}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
