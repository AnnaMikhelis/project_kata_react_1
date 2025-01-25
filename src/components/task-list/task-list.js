import React from "react";
import Task from "../task/task";
import '../task-list/task-list.css'

const TaskList = ({ todos, onDeleted }) => {
    const elements = todos.map((item) => {

        const {id, ...itemProps} = item;
        return (
            <li key = {item.id}>
                <Task {...itemProps}
                onDeleted = {() => onDeleted(id)}/>
            </li>
        )
    })

    return (
        <ul className = "task-list">
            { elements }
        </ul>
    )
}

export default TaskList; 