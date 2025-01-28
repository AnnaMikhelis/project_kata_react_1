import React from "react";
import TasksFilter from "../tasks-filter/tasks-filter";
import '../footer/footer.css'


const Footer = ({ left, filter, setFilter, onClearCompleted}) => {
    return (
    <footer className="footer">
          <span className="todo-count">{left} items left</span>
          <TasksFilter currentFilter={filter} setFilter={setFilter}/>
          <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
</footer>
    )
}



export default Footer;