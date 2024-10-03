import { useState } from "react";
import { useDBcontext } from "../contexts/DBContext";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Checkbox,
  LinearProgress,
} from "@mui/joy";

import vertical_menu from "/vertical_menu.svg";

function TodoList({ tasks, input }) {
  const [text, setText] = useState("");

  const { addTask, taskLoading, updateTaskCompleted } = useDBcontext();

  const handleAddTask = async (e) => {
    e.preventDefault();
    let time = new Date();
    // let temp = text;
    setText("");
    await addTask(text, time);
  };
  const handleUpdateTask = (task) => {
    updateTaskCompleted(task);
  };

  const ItemMenu = (
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
          sx={{
            padding: "0 20px",
            border: "0",
            fontSize: "16px",
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );

  if (taskLoading) {
    return <LinearProgress thickness={2} color='neutral' variant='soft' />;
  }

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
              onClick={() => handleUpdateTask(task)}
              checked={task.completed}
            />
            <span className='text'>
              {task.text}
              {/* <p className='time'>{task.time}</p> */}
            </span>
            {ItemMenu}
          </li>
        ))}
      </ul>
    );
  };

  // ########### Todo List Component ###########

  return (
    <>
      <TasksList />
      {input && (
        <form onSubmit={handleAddTask} className='todo_form'>
          <input
            type='text'
            disabled={taskLoading}
            onChange={(e) => setText(e.target.value)}
            value={text}
            className='input'
            placeholder='Add new task...'
          />
        </form>
      )}
    </>
  );
}

export default TodoList;
