import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import "./task-list.css";

function TaskList({ todos, onDeleted, onToggleCompleted, onEdit }) {
  const elements = todos.map((item) => {
    return (
      <li key={item.id}>
        <Task
          label={item.label}
          completed={item.completed}
          createdDate={item.createdDate}
          id={item.id}
          onDeleted={() => onDeleted(item.id)}
          onToggleCompleted={() => onToggleCompleted(item.id)}
          onEdit={onEdit} 
        />
      </li>
    );
  });
  return <ul className="task-list">{elements}</ul>;
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      createdDate: PropTypes.instanceOf(Date),
    }),
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired, 
};

export default TaskList;