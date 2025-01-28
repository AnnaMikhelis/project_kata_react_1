import React from "react";
import '../task/task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';


export default class Task extends React.Component {
  static defaultProps = {
    label: '',
    completed: false,
    editing: false,
    createdDate: new Date()
};

static propTypes = {
    label: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    createdDate: PropTypes.instanceOf(Date)
};

  
  
  render() {
    const {label, onDeleted, onToggleCompleted, completed, createdDate} = this.props;
    
    return (
      <div className={`task ${completed ? 'completed' : ''}`}  
       >
      <div className="view " >
        <div onClick = {onToggleCompleted}>
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange = {() => {}}
        />
        <label>
          <span className="description">{label}</span>
          <span className="created">created {formatDistanceToNow(new Date(createdDate))} ago</span>
        </label>
        </div>
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