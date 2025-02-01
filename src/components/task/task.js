import React from 'react';
import PropTypes from 'prop-types';
import "./task.css";
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  label,
  onDeleted,
  onToggleCompleted,
  completed,
  createdDate,
  editing,
}) => {
  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
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

        <button className="icon icon-edit" type="button" aria-label="Edit task" />
        <button
          className="icon icon-destroy"
          type="button"
          onClick={onDeleted}
          aria-label="Delete task"
        />

      </div>
      {editing && (
        <input type="text" className="edit" value={label} />
      )}
    </div>
  );
};

Task.defaultProps = {
  completed: false,
  editing: false,
  createdDate: new Date(),
};

Task.propTypes = {
  label: PropTypes.string.isRequired, 
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  createdDate: PropTypes.instanceOf(Date),
};

export default Task;