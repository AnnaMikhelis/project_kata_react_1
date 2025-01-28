import React from "react";
import '../tasks-filter/tasks-filter.css'

export default class TasksFilter extends React.Component {

  render() {

    const { currentFilter, setFilter } = this.props;

    return (
              <ul className="filters">
                  <li>
                    <button className={currentFilter === 'all' ? 'selected' : ''} 
                        onClick={() => setFilter('all')}>All</button>
                  </li>
                  <li>
                    <button className={currentFilter === 'active' ? 'selected' : ''} 
                        onClick={() => setFilter('active')}>Active</button>
                  </li>
                  <li>
                    <button className={currentFilter === 'completed' ? 'selected' : ''} 
                        onClick={() => setFilter('completed')}>Completed</button>
                  </li>
                </ul>
          )
  }
}

// const TasksFilter = () => {
//     return (
//         <ul className="filters">
//             <li>
//               <button className="selected">All</button>
//             </li>
//             <li>
//               <button>Active</button>
//             </li>
//             <li>
//               <button>Completed</button>
//             </li>
//           </ul>
//     )
// };

// export default TasksFilter;