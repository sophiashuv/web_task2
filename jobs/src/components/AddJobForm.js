import { Component } from 'react';
import { createJob } from '../api';
import './style.css';
import {Button, Form}  from 'react-bootstrap';


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
        {/*<input*/}
        {/*  id="timeout"*/}
        {/*  placeholder="timeout"*/}
        {/*  type="number"*/}
        {/*  value={this.state.timeout}*/}
        {/*  onChange={this.onTimeoutChange}*/}
        {/*/>*/}
        <Form className="form-wrapper">
          <Form.Group className="mb-3">
            <div className="title">Text to Image Transformer</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter time in milliseconds</Form.Label>
            <Form.Control id="timeout"
                          placeholder="timeout"
                          type="number"
                          value={this.state.timeout}
                          onChange={this.onTimeoutChange}/>
          </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Enter text</Form.Label>
          <Form.Control as="textarea" rows={3}
                        value={this.state.text}
                        onChange={this.onTextChange}/>
        </Form.Group>
        <Button variant="success" onClick={this.onSubmit}>Create Job</Button>
        </Form>
      </div>
    );
  }
}
