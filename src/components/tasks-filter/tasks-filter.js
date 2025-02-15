import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

function TasksFilter({ currentFilter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
        type='button'
          className={currentFilter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
        type='button'
          className={currentFilter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
        type='button'
          className={currentFilter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TasksFilter;