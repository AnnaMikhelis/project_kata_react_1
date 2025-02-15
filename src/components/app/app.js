/* eslint-disable class-methods-use-this */
import React from 'react';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import '../global.css';
import './app.css';

export default class TodoApp extends React.Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      todoData: [],
      filter: 'all',
    };
    this.timers = {};
  }

  createTask = (label) => ({
    label,
    completed: false,
    editing: false,
    id: this.maxId++,
    createdDate: new Date(),
    timeSpent: 0, 
    isTimerRunning: false, 
  });

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return { todoData }; 
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  clearCompletedTasks = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.completed),
    }));
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return { todoData }; 
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newArray };
    });
  };

  onEdit = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return { todoData }; 
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, label: newLabel };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newArray };
    });
  };

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return { todoData }; 
      const oldTask = todoData[idx];
      const newTask = {
        ...oldTask,
        isTimerRunning: true,
        startTime: Date.now(), 
      };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];

      
      this.timers[id] = setInterval(() => {
        this.updateTimeSpent(id);
      }, 1000);

      return { todoData: newArray };
    });
  };

  pauseTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return { todoData }; 
      const oldTask = todoData[idx];
      const elapsedTime = Date.now() - oldTask.startTime; 
      const newTask = {
        ...oldTask,
        isTimerRunning: false,
        timeSpent: oldTask.timeSpent + elapsedTime,
      };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];

      clearInterval(this.timers[id]);
      delete this.timers[id];

      return { todoData: newArray };
    });
  };

  updateTimeSpent = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      if (idx === -1) return { todoData }; 
      const oldTask = todoData[idx];
      const elapsedTime = Date.now() - oldTask.startTime;
      const newTask = {
        ...oldTask,
        timeSpent: oldTask.timeSpent + elapsedTime, 
        startTime: Date.now(), 
      };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      return { todoData: newArray };
    });
  };

  onAdd = (text) => {
    this.setState(({ todoData }) => {
      const newTask = this.createTask(text);
      const newArray = [...todoData, newTask];
      return { todoData: newArray };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  filterTasks(tasks, filter) {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleTasks = this.filterTasks(todoData, filter);
    const left = todoData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={this.onAdd} />
        </header>
        <TaskList
          todos={visibleTasks}
          onDeleted={this.deleteTask}
          onToggleCompleted={this.onToggleCompleted}
          onEdit={this.onEdit}
          onStartTimer={(id) => this.startTimer(id)} 
          onPauseTimer={(id) => this.pauseTimer(id)} 
        />
        <Footer
          left={left}
          filter={filter}
          setFilter={this.setFilter}
          onClearCompleted={this.clearCompletedTasks}
        />
      </section>
    );
  }
}