/* eslint-disable class-methods-use-this */
import React from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import '../global.css';
import "./app.css";

export default class TodoApp extends React.Component {
  constructor() {
    super();
    this.maxId = 100;
    this.state = {
      todoData: [
        
      ],
      filter: 'all', // all active completed
    };
  }

  setFilter = (filter) => {
    this.setState({ filter });
  };

  createTask = (label) => ({
    label,
    completed: false,
    editing: false,
    id: this.maxId++,
    createdDate: new Date(),
  });

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
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
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };

  onAdd = (text) => {
    this.setState(({ todoData }) => {
      const newTask = this.createTask(text);
      const newArray = [...todoData, newTask];
      return {
        todoData: newArray,
      };
    });
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

