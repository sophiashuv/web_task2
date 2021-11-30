import { Component } from 'react';
import { createJob } from '../api';
import {Button}  from 'react-bootstrap';


export class AddJobForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      timeout: 3000,
      text: '',
    };

    this.onTimeoutChange = this.onTimeoutChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTimeoutChange(e){
    this.setState({timeout: e.target.value})
  }

  onTextChange(e){
    this.setState({text: e.target.value})
  }

  onSubmit(){
    createJob({
      status: 'pending',
      timeout: this.state.timeout,
      text: this.state.text,
    });
  }

  render(){
    return (
      <div>
        <input
          id="timeout"
          placeholder="timeout"
          type="number"
          value={this.state.timeout}
          onChange={this.onTimeoutChange}
        />
        <textarea
          value={this.state.text}
          onChange={this.onTextChange}
        />
        <Button variant="primary" onClick={this.onSubmit}>Create Job</Button>
      </div>
    );
  }
}
