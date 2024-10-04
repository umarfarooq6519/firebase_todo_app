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
} from "@mui/joy";

import vertical_menu from "/vertical_menu.svg";
import send_icon from "/send_icon.svg";
import bin_icon from "/bin_icon.svg";

function TodoList({ tasks, input }) {
  const [text, setText] = useState("");

  const { addTask, delTask, taskLoading, updateTaskCompleted } = useDBcontext();

  const handleAddTask = async (e) => {
    // function to handle add task
    e.preventDefault();
    let time = new Date();
    setText("");
    await addTask(text, time);
  };

  const handleDelTask = async (taskID) => {
    await delTask(taskID);
  };

  const handleTaskCompletion = (task) => {
    // toggle task complete state (true or false)
    updateTaskCompleted(task);
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
    <p className='empty_tasks flex_center'>It's empty here :(</p>
  );

  const TasksList = () => {
    return (
      <ul className='todo_list flex_col_start'>
        {tasks.map((task) => (
          <li key={task.id} className='item flex_between'>
            <Checkbox
              sx={{ marginRight: "6px" }}
              color='neutral'
              label=''
              size='sm'
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
        </form>
      )}
    </>
  );
}

export default TodoList;
