import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  constructor() { 
    super();
    this.state = {
      label: '',
    };

  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdd } = this.props; 
    e.preventDefault();
    const { label } = this.state; 
    if (label.trim()) {
      onAdd(label); 
      this.setState({
        label: '', 
      });
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

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};