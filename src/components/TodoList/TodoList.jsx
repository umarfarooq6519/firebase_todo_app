import { useState } from "react";
import { Checkbox, LinearProgress } from "@mui/joy";
import { motion } from "framer-motion";
import { opacityAnimation } from "../../utils/animations";

import { useDBcontext } from "../../contexts/DBContext";

import TaskMenu from "../TaskMenu/TaskMenu";
import SnackbarComponent from "../Snackbar/Snackbar";
import CreateTask from "../CreateTask/CreateTask";

import date_icon from "/date_icon.svg";
import "./TodoList.css";

function TodoList({ tasks, input }) {
  const { delTask, taskLoading, updateTaskCompleted } = useDBcontext();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    color: "",
    msg: "",
  });

  const handleDelTask = async (taskID) => {
    // function to handle delete task
    setSnackbarState({ open: true, color: "danger", msg: "Task Deleted!" });
    await delTask(taskID);

    setTimeout(() => {
      // Set snackbar to false after 1.5s
      setSnackbarState({ open: false, color: "", msg: "" });
    }, 1500);
  };

  const handleTaskCompletion = async (task) => {
    // toggle task complete state (boolean)
    await updateTaskCompleted(task);
  };

  if (taskLoading) {
    return <LinearProgress thickness={2} color='neutral' variant='soft' />;
  }

  const emptyTasks = (
    <p className='empty_tasks flex_center'>It's empty here!😕</p>
  );

  const sortedTasks = tasks.sort((a, b) => {
    const aTime = a.createdAt.toDate();
    const bTime = b.createdAt.toDate();
    return bTime - aTime; // Sort by recent
  });

  const staggerAnimation = {
    hidden: { transition: { staggerChildren: 0.1 } },
    show: { transition: { staggerChildren: 0.1 } },
  };

  const childAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  // ########## Tasks List ############

  const TasksList = () => {
    return (
      <motion.ul
        className='todo_list flex_col_start'
        variants={staggerAnimation}
        initial='hidden'
        animate='show'
      >
        {sortedTasks.map((task) => (
          <motion.li
            key={task.id}
            className='item flex_between'
            variants={childAnimation} // Apply the child animation
          >
            <Checkbox
              sx={{ marginRight: "6px" }}
              color='neutral'
              label=''
              size='md'
              variant='outlined'
              onClick={() => handleTaskCompletion(task)}
              checked={task.completed}
            />
            <div className='task flex_col_between'>
              <span className='title flex_between'>
                <span
                  className={`task_title ${
                    task.completed ? "completed_task" : ""
                  }`}
                >
                  {task.title}
                </span>
                {task.due && (
                  <p className='due_date flex_center'>
                    <img src={date_icon} alt='' className='icon' />
                    {task.due}
                  </p>
                )}
              </span>
              <span
                className={`task_desc ${
                  task.completed ? "completed_task" : ""
                }`}
              >
                {task.desc}
              </span>
            </div>
            <TaskMenu onClick={() => handleDelTask(task.id)} />
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  // ########### Todo List Component ###########

  return (
    <>
      {tasks.length == 0 ? emptyTasks : <TasksList />}
      {input && (
        <div className='create_task_wrapper'>
          <CreateTask />
        </div>
      )}
      <SnackbarComponent snackbarState={snackbarState} />
    </>
  );
}

export default TodoList;
