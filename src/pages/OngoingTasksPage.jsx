import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { opacityAnimation } from "../utils/animations";

import { useDBcontext } from "../contexts/DBContext";

import TodoList from "../components/TodoList/TodoList";
import arrow_left from "/arrow_left.svg";

const OngoingTasksPage = () => {
  const { ongoingTasks } = useDBcontext();

  //   ############ Ongoing Tasks Page ############

  return (
    <div className='ongoing_tasks container'>
      <div className='wrapper flex_start'>
        <Link to='/dashboard'>
          <img src={arrow_left} alt='Go back' className='icon' />
        </Link>
        <div className='heading_animation'>
          <motion.h3 {...opacityAnimation}>Ongoing Tasks</motion.h3>
        </div>
      </div>

      <div className='content container'>
        <TodoList tasks={ongoingTasks} input={true} />
      </div>
    </div>
  );
};

export default OngoingTasksPage;
