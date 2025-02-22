import React, { useState, useRef } from 'react';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import '../global.css';
import './app.css';

const TodoApp = () => {
  const maxIdRef = useRef(100);
  const [todoData, setTodoData] = useState([]); 
  const [filter, setFilter] = useState('all'); 
  const timers = useRef({});

  const createTask = (label, totalTime = null) => ({
    label,
    completed: false,
    editing: false,
    id: maxIdRef.current++,
    createdDate: new Date(),
    timeSpent: 0,
    isTimerRunning: false,
    totalTime,
  });

  const deleteTask = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      clearInterval(timers.current[id]);
      delete timers.current[id];
      const newArray = [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];
      return newArray;
    });
  };

  const onEdit = (id, newLabel) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      const oldTask = prevTodoData[idx];
      const newTask = { ...oldTask, label: newLabel };
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
      return newArray;
    });
  };

  const onToggleCompleted = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      const oldTask = prevTodoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
      return newArray;
    });
  };

  const updateElapsedTime = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      const oldTask = prevTodoData[idx];
      const elapsedTime = Date.now() - oldTask.startTime;
      const newTask = {
        ...oldTask,
        timeSpent: oldTask.timeSpent + elapsedTime,
        startTime: Date.now(),
      };
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
      return newArray;
    });
  };

  const updateCountdown = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      const oldTask = prevTodoData[idx];
      const elapsedTime = Date.now() - oldTask.startTime;
      if (elapsedTime >= oldTask.totalTime) {
        clearInterval(timers.current[id]);
        delete timers.current[id];
        return {
          todoData: [
            ...prevTodoData.slice(0, idx),
            { ...oldTask, isTimerRunning: false, timeSpent: oldTask.totalTime },
            ...prevTodoData.slice(idx + 1),
          ],
        };
      }
      const newTask = {
        ...oldTask,
        timeSpent: elapsedTime,
      };
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
      return newArray;
    });
  };

  const startTimer = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      const oldTask = prevTodoData[idx];
      const newTask = {
        ...oldTask,
        isTimerRunning: true,
        startTime: Date.now(),
      };
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
      if (oldTask.totalTime !== null) {
        timers.current[id] = setInterval(() => {
          updateCountdown(id);
        }, 1000);
      } else {
        timers.current[id] = setInterval(() => {
          updateElapsedTime(id);
        }, 1000);
      }
      return newArray;
    });
  };

  const pauseTimer = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id);
      if (idx === -1) return prevTodoData;
      const oldTask = prevTodoData[idx];
      const elapsedTime = Date.now() - oldTask.startTime;
      const newTask = {
        ...oldTask,
        isTimerRunning: false,
        timeSpent: oldTask.timeSpent + elapsedTime,
      };
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newTask,
        ...prevTodoData.slice(idx + 1),
      ];
      clearInterval(timers.current[id]);
      delete timers.current[id];
      return newArray;
    });
  };

  
  const onAdd = (label, totalTime = null) => {
    setTodoData((prevTodoData) => {
      const newTask = createTask(label, totalTime);
      return [...prevTodoData, newTask];
    });
  };

  const clearCompletedTasks = () => {
    setTodoData((prevTodoData) => {
      const filteredTasks = prevTodoData.filter((task) => !task.completed);
      Object.keys(timers.current).forEach((timerId) => {
        const task = prevTodoData.find((t) => t.id === parseInt(timerId, 10));
        if (task && task.completed) {
          clearInterval(timers.current[timerId]);
          delete timers.current[timerId];
        }
      });
      return filteredTasks;
    });
  };

  const filterTasks = (tasks, currentFilter) => {
    switch (currentFilter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const visibleTasks = filterTasks(todoData, filter);
  const left = todoData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={onAdd} />
      </header>
      <TaskList
        todos={visibleTasks}
        onDeleted={deleteTask}
        onToggleCompleted={onToggleCompleted}
        onEdit={onEdit}
        onStartTimer={startTimer}
        onPauseTimer={pauseTimer}
      />
      <Footer
        left={left}
        filter={filter}
        setFilter={setFilter}
        onClearCompleted={clearCompletedTasks}
      />
    </section>
  );
};

export default TodoApp;