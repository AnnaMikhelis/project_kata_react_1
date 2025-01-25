import React from "react";
import '../task/task.css';

export default class Task extends React.Component {

  constructor () {
    super();

    this.state = {completed: false}

    this.onLableClick = () => {
      this.setState ((state) => {
        return {
          completed: !state.completed
        }
      })
    }
  }

  
  
  render() {
    const {label, onDeleted} = this.props;
    const {completed} = this.state;
    return (
      <div className={`task ${completed ? 'completed' : ''}`}  
      onClick = {this.onLableClick} >
      <div className="view " >
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange = {() => {}}
        />
        <label>
          <span className="description">{label}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button
          className="icon icon-destroy"
          onClick={onDeleted}
        ></button>
      </div>
      {this.props.editing && (
        <input type="text" className="edit" value={label} />
      )}
    </div>
  )
  }

}

// const Task1 = ( {label} ) => {
//     return (
//         <div className="completed">
//             <div className="view">
//               <input className="toggle" type="checkbox" />
//               <label>
//                 <span className="description"> {label} </span>
//                 <span className="created">created 17 seconds ago</span>
//               </label>
//               <button className="icon icon-edit"></button>
//               <button className="icon icon-destroy"></button>
//             </div>
//           </div>
//     )
// };

// export default Task;