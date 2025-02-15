import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    if (label.trim()) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onAdd(label); 
      this.setState({ label: '' }); 
    }
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

