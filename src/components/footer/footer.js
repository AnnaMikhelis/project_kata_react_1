import React from 'react';

import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter/tasks-filter';
import "./footer.css";

function Footer({ left, filter, setFilter, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{left} items left</span>
      <TasksFilter currentFilter={filter} setFilter={setFilter} />
      <button type = 'button' className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  left: PropTypes.number.isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  setFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
