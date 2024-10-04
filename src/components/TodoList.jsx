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

import vertical_menu from "/vertical_menu.svg";
import send_icon from "/send_icon.svg";
import bin_icon from "/bin_icon.svg";
import NewTask from "./NewTask";

function TodoList({ tasks, input }) {
  const [text, setText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, color: "" });

  const { addTask, delTask, taskLoading, updateTaskCompleted } = useDBcontext();

  const handleAddTask = async (e) => {
    // function to handle add task
    e.preventDefault();
    if (text.trim() === "") return; // if empty don't do anything
    setSnackbar({ open: true, color: "success" });
    let time = new Date();
    setText("");
    await addTask(text, time);

    setTimeout(() => {
      // Set snackbar to false after 1.5s
      setSnackbar({ open: false, color: "" });
    }, 1500);
  };
  const handleDelTask = async (taskID) => {
    // function to handle delete task
    setSnackbar({ open: true, color: "danger" });
    await delTask(taskID);

    setTimeout(() => {
      // Set snackbar to false after 1.5s
      setSnackbar({ open: false, color: "" });
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
    return "N/A";
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
            sx={{
              padding: "0 20px",
              border: "0",
              fontSize: "16px",
            }}
          >
            Edit
          </MenuItem>
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
        variant='outlined'
      >
        {snackbar.color === "success" ? "Task Added!" : "Task Removed!"}
      </Snackbar>
    );
  };

  const TasksList = () => {
    return (
      <ul className='todo_list flex_col_start'>
        <SnackbarAlert />
        {tasks.map((task) => (
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
            <span className='text'>
              <span className={`${task.completed ? "completed_task" : ""}`}>
                {task.text}
              </span>
              <p className='time'>{formatTimestamp(task.time)}</p>
            </span>
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
      {input && (
        <form onSubmit={handleAddTask} className='todo_form'>
          <div className='input_container'>
            <input
              type='text'
              disabled={taskLoading}
              onChange={(e) => setText(e.target.value)}
              value={text}
              className='input shadow_sm'
              placeholder='Add new task...'
            />
            <button type='submit' className='icon_wrapper'>
              <img src={send_icon} alt='send' className='icon' />
            </button>
          </div>
          {/* <NewTask /> */}
        </form>
      )}
    </>
  );
}

export default TodoList;
