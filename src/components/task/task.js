import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  label,
  onDeleted,
  onToggleCompleted,
  completed,
  createdDate,
  id,
  onEdit,
  timeSpent,
  isTimerRunning,
  onStartTimer,
  onPauseTimer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  const handleEditSubmit = () => {
    if (newLabel.trim()) {
      onEdit(id, newLabel);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
      {!isEditing && (
        <div className="view">
          <button
            className="toggle-button"
            type="button"
            onClick={() => onToggleCompleted(id)}
            aria-label="Toggle task completion"
          >
            <input
              className="toggle"
              type="checkbox"
              checked={completed}
              readOnly
            />
            <label htmlFor="task-description">
              <span className="description">{label}</span>
              <span className="created">
                created {formatDistanceToNow(new Date(createdDate))} ago
              </span>
            </label>
          </button>

          <button
            className="icon icon-edit"
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          />

          <button
            className="icon icon-destroy"
            type="button"
            onClick={() => onDeleted(id)}
            aria-label="Delete task"
          />

          <div className="timer-controls">
            <span className="time-spent">
              {Math.floor(timeSpent / 1000)} sec
            </span>
            {isTimerRunning ? (
              <button
                className="icon icon-pause"
                type="button"
                onClick={() => onPauseTimer(id)}
                aria-label="Pause timer"
              />
            ) : (
              <button
                className="icon icon-play"
                type="button"
                onClick={() => onStartTimer(id)}
                aria-label="Start timer"
              />
            )}
          </div>
        </div>
      )}

      {isEditing && (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="edit"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Edit task"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditSubmit();
              }
            }}
          />
        </form>
      )}
    </div>
  );
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  createdDate: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  timeSpent: PropTypes.number, 
  isTimerRunning: PropTypes.bool, 
  onStartTimer: PropTypes.func.isRequired, 
  onPauseTimer: PropTypes.func.isRequired, 
};

Task.defaultProps = {
  completed: false,
  createdDate: new Date(),
  timeSpent: 0, 
  isTimerRunning: false, 
};

export default Task;