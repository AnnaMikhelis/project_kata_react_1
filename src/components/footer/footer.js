import React from "react";
import TasksFilter from "../tasks-filter/tasks-filter";
import '../footer/footer.css'

const Footer = () => {
    return (
    <footer class="footer">
          <span class="todo-count">1 items left</span>
          <TasksFilter/>
          <button class="clear-completed">Clear completed</button>
</footer>
    )
}



export default Footer;