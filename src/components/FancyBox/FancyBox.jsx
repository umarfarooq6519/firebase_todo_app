import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fancyBoxAnimation } from "../../utils/animations";

import { useDBcontext } from "../../contexts/DBContext";

import arrow_right_light from "/arrow_right_light.svg";
import "./FancyBox.css";

const FancyBox = ({ text, handleClick, tasks }) => {
  const { ongoingTasks, completedTasks } = useDBcontext();
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    if (tasks == "ongoing") setTasksList(ongoingTasks);
    else if (tasks == "completed") setTasksList(completedTasks);
  }, [tasks]);

  return (
    <motion.div
      // {...fancyBoxAnimation}
      onClick={handleClick}
      className='fancy_box flex_col_between shadow_sm'
    >
      <h4 className='heading'>{text}</h4>
      <ul className='tasks'>
        {tasksList.slice(0, 3).map((task) => (
          <li key={task.id}>
            <p className={`${task.completed ? "completed_task" : ""}`}>
              {task.title}
            </p>
          </li>
        ))}
        {tasksList.length === 0 && <p>No tasks available.</p>}
      </ul>
      <span className='arrow'>
        <img src={arrow_right_light} className='icon' alt='' />
      </span>
    </motion.div>
  );
};

export default FancyBox;
