import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import "./task-list.css";

function TaskList({ todos, onDeleted, onToggleCompleted }) {
  const elements = todos.map((item) => {
    return (
      <li key={item.id}>
        <Task
          label={item.label}
          completed={item.completed}
          editing={item.editing}
          createdDate={item.createdDate}
          id={item.id}
          onDeleted={() => onDeleted(item.id)}
          onToggleCompleted={() => onToggleCompleted(item.id)}
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
      editing: PropTypes.bool,
      createdDate: PropTypes.instanceOf(Date),
    }),
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};

export default TaskList;