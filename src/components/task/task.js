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
  timeSpent, // Пропс для времени, проведенного над задачей
  isTimerRunning, // Пропс для состояния таймера
  onStartTimer, // Callback для запуска таймера
  onPauseTimer, // Callback для паузы таймера // Callback для обновления времени
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  const handleEditSubmit = (e) => {
    e.preventDefault();
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

          {/* Кнопка редактирования */}
          <button
            className="icon icon-edit"
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          />

          {/* Кнопка удаления */}
          <button
            className="icon icon-destroy"
            type="button"
            onClick={onDeleted}
            aria-label="Delete task"
          />

          {/* Отображение времени и кнопки управления таймером */}
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

      {/* Поле редактирования */}
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="edit"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
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
  timeSpent: PropTypes.number, // Добавляем проверку для timeSpent
  isTimerRunning: PropTypes.bool, // Добавляем проверку для isTimerRunning
  onStartTimer: PropTypes.func.isRequired, // Добавляем проверку для onStartTimer
  onPauseTimer: PropTypes.func.isRequired, // Добавляем проверку для onPauseTimer
  // Добавляем проверку для updateTimeSpent
};

Task.defaultProps = {
  completed: false,
  createdDate: new Date(),
  timeSpent: 0, // Устанавливаем начальное значение времени
  isTimerRunning: false, // Устанавливаем начальное состояние таймера
};

export default Task;