import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default function NewTaskForm({ onAdd }) {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleMinutesChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10)) || '';
    setMinutes(value);
  };

  const handleSecondsChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10)) || '';
    setSeconds(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

      onAdd(label, totalTimeInSeconds);

      // Сброс состояния после отправки формы
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      className="new-todo-form"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyPress}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleLabelChange}
        value={label}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="min"
        onChange={handleMinutesChange}
        value={minutes}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="sec"
        onChange={handleSecondsChange}
        value={seconds}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};