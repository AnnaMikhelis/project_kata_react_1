import React from 'react';
import PropTypes from 'prop-types';
import "./tasks-filter.css";


const TasksFilter = ({ currentFilter, setFilter }) => (
  <ul className="filters">
    <li>
      <button
        type="button" 
        className={currentFilter === 'all' ? 'selected' : ''}
        onClick={() => setFilter('all')}
        aria-label="Show all tasks"
      >
        All
      </button>
    </li>
    <li>
      <button
        type="button" 
        className={currentFilter === 'active' ? 'selected' : ''}
        onClick={() => setFilter('active')}
        aria-label="Show active tasks"
      >
        Active
      </button>
    </li>
    <li>
      <button
        type="button" 
        className={currentFilter === 'completed' ? 'selected' : ''}
        onClick={() => setFilter('completed')}
        aria-label="Show completed tasks"
      >
        Completed
      </button>
    </li>
  </ul>
);


TasksFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TasksFilter;