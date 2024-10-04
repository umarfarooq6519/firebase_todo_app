import { useState, useEffect } from "react";
import { useDBcontext } from "../contexts/DBContext";
import arrow_right_light from "/arrow_right_light.svg";

const FancyBox = ({ text, handleClick, tasks }) => {
  const { ongoingTasks, completedTasks } = useDBcontext();
  const [tasksList, setTasksList] = useState([]);

  const text1 = text.split(" ")[0];
  const text2 = text.split(" ")[1];

  useEffect(() => {
    if (tasks == "ongoing") setTasksList(ongoingTasks);
    else if (tasks == "completed") setTasksList(completedTasks);
  }, [tasks, ongoingTasks, completedTasks]);

  return (
    <div onClick={handleClick} className='fancy_box flex_col_between shadow_sm'>
      <h4>
        {text1} <br /> {text2}
      </h4>
      <ul className='tasks'>
        {tasksList.slice(0, 3).map((task) => (
          <li key={task.id} className="">
            <p className={task.completed ? "completed_task" : ""}>
              {task.text}
            </p>
          </li>
        ))}
        {tasksList.length === 0 && <p>No tasks available.</p>}
      </ul>
      <span className='arrow'>
        <h6>View all</h6>
        <img src={arrow_right_light} className='icon' alt='' />
      </span>
    </div>
  );
};

export default FancyBox;
