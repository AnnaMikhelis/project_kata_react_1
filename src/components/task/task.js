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
            onClick={onToggleCompleted}
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
            onClick={onDeleted}
            aria-label="Delete task"
          />
        </div>
      )}

      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit(); 
          }}
        >
          <input
            type="text"
            className="edit"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleEditSubmit(); 
              }
            }}
            placeholder="Edit task"
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
};

Task.defaultProps = {
  completed: false,
  createdDate: new Date(),
};

export default Task;