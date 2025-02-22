import React, { useState, useEffect } from 'react';
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
  totalTime,
  timeSpent: initialTimeSpent,
  isTimerRunning: initialIsTimerRunning,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);
  const [timeSpent, setTimeSpent] = useState(initialTimeSpent);
  const [isTimerRunning, setIsTimerRunning] = useState(initialIsTimerRunning);

  let timer = null;

  useEffect(() => {
    if (isTimerRunning) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setInterval(() => {
        setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const handleEditSubmit = () => {
    if (newLabel.trim()) {
      onEdit(id, newLabel); 
      setIsEditing(false);
    }
  };

  const formatTime = (time) => {
    if (time === null) return ''; 
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };


  const remainingTime = totalTime !== null ? totalTime - timeSpent : null;
  const getTimeDisplay = () => {
    if (totalTime === null) return null;
    if (remainingTime >= 0) {
      return `${formatTime(remainingTime)} left`;
    }
    return null;
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
    id={`toggle-${id}`} 
    className="toggle"
    type="checkbox"
    checked={completed}
    readOnly
  />
  <label htmlFor={`toggle-${id}`}> 
    {/* */}
  </label>
</button>

          
          <label htmlFor="task-description">
            <span className="title">{label}</span>
          </label>

          
          {totalTime !== null && (
            <div className="timer-controls">
              {isTimerRunning ? (
                <button
                  className="icon icon-pause"
                  type="button"
                  onClick={pauseTimer}
                  aria-label="Pause timer"
                />
              ) : (
                <button
                  className="icon icon-play"
                  type="button"
                  onClick={startTimer}
                  aria-label="Start timer"
                />
              )}
            </div>
          )}

          
          <span className="time-spent">{getTimeDisplay()}</span>

          
          <span className="created">
            created {formatDistanceToNow(new Date(createdDate))} ago
          </span>

          
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
  totalTime: PropTypes.number, 
  timeSpent: PropTypes.number, 
  isTimerRunning: PropTypes.bool, 
};

Task.defaultProps = {
  completed: false,
  createdDate: new Date(),
  totalTime: null, 
  timeSpent: 0, 
  isTimerRunning: false, 
};

export default Task;