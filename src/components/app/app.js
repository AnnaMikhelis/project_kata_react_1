import React from "react";

import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";
import '../global.css';
import '../app/app.css'

export default class TodoApp extends React.Component {
    constructor() {
      super();
  
      this.state = {
        todoData: [
          {label: "Выполненная задача", completed: true, editing: false, id: 1},
          {label: "Редактируемая задача", completed: false, editing: false, id: 2},
          {label: "Обычная задача", completed: false, editing: false, id: 3},
        ]
      }
    }
  
    deleteTask = (id) => {
        this.setState(({ todoData}) => {
            const idx = todoData.findIndex ((el) => el.id === id);

            return {
                todoData: todoData.toSpliced(idx, 1)
            }; 
        })
    }
    render () {
      return (
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm />
          </header>
          <TaskList 
          todos = {this.state.todoData} 
          onDeleted = {this.deleteTask} />
          <Footer />
        </section>
      )
    }
    
  }