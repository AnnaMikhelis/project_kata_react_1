import React from "react";
import ReactDOM from 'react-dom/client';

import NewTaskForm from "./components/new-task-form/new-task-form";
import TaskList from "./components/task-list/task-list";
import Footer from "./components/footer/footer";
import './components/global.css';
import './components/app.css'

const root = ReactDOM.createRoot(document.getElementById('root'));




const TodoApp = () => {

  const todoData = [
    {label: "Выполненная задача", className: 'completed', id: 1},
    {label: "Редактируемая задача", className: 'editing', id: 2},
    {label: "Обычная задача", className: "", id: 3},
  ];
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <TaskList todos = {todoData} />
      <Footer />
    </section>
  )
}
root.render (<TodoApp/>, root);