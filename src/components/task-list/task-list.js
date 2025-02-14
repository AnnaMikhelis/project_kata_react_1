import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';
import './task-list.css';

function TaskList({ todos, onDeleted, onToggleCompleted, onEdit, onStartTimer, onPauseTimer, onUpdateTimeSpent }) {
  const elements = todos.map((item) => {
    return (
      <li key={item.id}>
        <Task
          label={item.label}
          completed={item.completed}
          createdDate={item.createdDate}
          id={item.id}
          onDeleted={onDeleted}
          onToggleCompleted={onToggleCompleted}
          onEdit={onEdit}
          timeSpent={item.timeSpent} // Передаем время
          isTimerRunning={item.isTimerRunning} // Передаем состояние таймера
          onStartTimer={() => onStartTimer(item.id)} // Передаем callback для старта
          onPauseTimer={() => onPauseTimer(item.id)} // Передаем callback для паузы
          onUpdateTimeSpent={onUpdateTimeSpent} // Передаем callback для обновления времени
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
      timeSpent: PropTypes.number.isRequired, // Добавляем проверку для timeSpent
      isTimerRunning: PropTypes.bool.isRequired, // Добавляем проверку для isTimerRunning
    }),
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired, // Добавляем проверку для onStartTimer
  onPauseTimer: PropTypes.func.isRequired, // Добавляем проверку для onPauseTimer
  onUpdateTimeSpent: PropTypes.func.isRequired, // Добавляем проверку для updateTimeSpent
};

export default TaskList;