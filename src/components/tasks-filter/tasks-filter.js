import React from "react";
import '../tasks-filter/tasks-filter.css'

export default class TasksFilter extends React.Component {

  render() {
    return (
              <ul className="filters">
                  <li>
                    <button className="selected">All</button>
                  </li>
                  <li>
                    <button>Active</button>
                  </li>
                  <li>
                    <button>Completed</button>
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