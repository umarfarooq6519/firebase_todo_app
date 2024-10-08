import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { opacityAnimation } from "../utils/animations";

import { useDBcontext } from "../contexts/DBContext";

import TodoList from "../components/TodoList/TodoList";
import arrow_left from "/arrow_left.svg";

const CompletedTasksPage = () => {
  const { completedTasks } = useDBcontext();

  //   ############ Completed Tasks Page ############

  return (
    <div className='completed_tasks container'>
      <span className='wrapper flex_start'>
        <Link to='/dashboard'>
          <img src={arrow_left} alt='Go back' className='icon' />
        </Link>
        <motion.h3 {...opacityAnimation}>Completed Tasks</motion.h3>
      </span>

      <div className='content container'>
        <TodoList tasks={completedTasks} input={false} />
      </div>
    </div>
  );
};

export default CompletedTasksPage;
