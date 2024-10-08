import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";

import vertical_menu from "/vertical_menu.svg";
import bin_icon from "/bin_icon.svg";

const TaskMenu = ({ onClick }) => {
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
          onClick={onClick}
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

export default TaskMenu;
