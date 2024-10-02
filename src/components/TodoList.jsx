import { Dropdown, MenuButton, Menu, MenuItem, Checkbox } from "@mui/joy";

import vertical_menu from "/vertical_menu.svg";

const TodoList = () => {
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

  return (
    <>
      <ul className='todo_list flex_col_start'>
        <li className='item flex_between'>
          <Checkbox
            sx={{ marginRight: "6px" }}
            color='neutral'
            label=''
            size='sm'
            variant='outlined'
          />
          <span className='text'>
            Swipe to see the full task, as it has overflow enabled! Lorem ipsum
            dolor sit.
            <p className='time'>12:36pm</p>
          </span>
          {ItemMenu}
        </li>
      </ul>

      <form action='' className='todo_form'>
        <input type='text' className='input' placeholder='Add new task...' />
      </form>
    </>
  );
};

export default TodoList;
