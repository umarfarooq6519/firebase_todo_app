import { useState } from "react";
import { useDBcontext } from "../contexts/DBContext";
import { Timestamp } from "firebase/firestore";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Checkbox,
  LinearProgress,
  Snackbar,
} from "@mui/joy";

import NewTask from "./NewTask";
import vertical_menu from "/vertical_menu.svg";
import bin_icon from "/bin_icon.svg";
import date_icon from "/date_icon.svg";

function TodoList({ tasks, input }) {
  const [snackbar, setSnackbar] = useState({ open: false, color: "", msg: "" });

  const { delTask, taskLoading, updateTaskCompleted } = useDBcontext();

  const sortedTasks = tasks.sort((a, b) => {
    const aTime = a.createdAt.toDate();
    const bTime = b.createdAt.toDate();
    return bTime - aTime; // Sort by recent
  });

  // console.log(sortedTasks);

  const handleDelTask = async (taskID) => {
    // function to handle delete task
    setSnackbar({ open: true, color: "danger", msg: "Task Deleted!" });
    await delTask(taskID);

    setTimeout(() => {
      // Set snackbar to false after 1.5s
      setSnackbar({ open: false, color: "", msg: "" });
    }, 1500);
  };

  const handleTaskCompletion = async (task) => {
    // toggle task complete state (boolean)
    await updateTaskCompleted(task);
  };

  const formatTimestamp = (timestamp) => {
    // formating firestore timestamp to display
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // use 12-hour format
      });
    }
    return null;
  };

  const ItemMenu = (task) => {
    return (
      <Dropdown>
        <MenuButton
          variant='plain'
          size='sm'
          sx={{
            padding: "0",
          }}
        >
          <img src={vertical_menu} alt='...' className='icon' />
        </MenuButton>
        <Menu
          variant='plain'
          size='sm'
          sx={{
            padding: "0",
          }}
        >
          <MenuItem
            variant='soft'
            color='danger'
            className='menu_item task_delete_menu'
            onClick={() => handleDelTask(task.task.id)}
            sx={{
              padding: "0 10px",
              border: "0",
              fontSize: "16px",
            }}
          >
            <img src={bin_icon} alt='' className='icon bin_icon' />
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  };

  if (taskLoading) {
    return <LinearProgress thickness={2} color='neutral' variant='soft' />;
  }

  const emptyTasks = (
    <p className='empty_tasks flex_center'>It's empty here!😕</p>
  );

  const SnackbarAlert = () => {
    return (
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        color={snackbar.color ? snackbar.color : "neutral"}
        variant='soft'
        sx={{
          minWidth: "fit-content",
          border: "1px solid currentColor",
          padding: "10px 20px",
        }}
      >
        {snackbar.msg}
      </Snackbar>
    );
  };

  const TasksList = () => {
    return (
      <ul className='todo_list flex_col_start'>
        <SnackbarAlert />
        {sortedTasks.map((task) => (
          <li key={task.id} className='item flex_between'>
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

            <ItemMenu task={task} />
          </li>
        ))}
      </ul>
    );
  };

  // ########### Todo List Component ###########

  return (
    <>
      {tasks.length == 0 ? emptyTasks : <TasksList />}
      {input && <NewTask setSnackbar={setSnackbar} />}
    </>
  );
}

export default TodoList;
