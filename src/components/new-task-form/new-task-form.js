import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor({ onAdd }) { 
    super();
    this.state = {
      label: '',
      minutes: '', 
      seconds: '', 
    };

    this.onAdd = onAdd; 
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onMinutesChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10)) || '';
    this.setState({ minutes: value });
  };

  onSecondsChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10)) || '';
    this.setState({ seconds: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;

    if (label.trim()) {
      let totalTimeInSeconds = 0;

      
      if (minutes !== '') {
        totalTimeInSeconds += parseInt(minutes, 10) * 60;
      }

      
      if (seconds !== '') {
        totalTimeInSeconds += parseInt(seconds, 10);
      }

      
      if (totalTimeInSeconds === 0 && minutes === '' && seconds === '') {
        totalTimeInSeconds = null;
      }

      this.onAdd(label, totalTimeInSeconds);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.onSubmit(event);  
      }
    };

  render() {
    const { label, minutes, seconds } = this.state;

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="new-todo-form" type="submit" onSubmit={this.onSubmit} onKeyDown={this.handleKeyPress}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="min"
          onChange={this.onMinutesChange}
          value={minutes}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="sec"
          onChange={this.onSecondsChange}
          value={seconds}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};