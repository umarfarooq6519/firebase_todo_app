import { useAuthContext } from "../contexts/AuthContext";
import "../styles/Dashboard.css";

import SecondaryBtn from "../components/SecondaryBtn";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/joy";
import UserAvatar from "../components/UserAvatar";

import menu_icon from "/menu_icon.svg";
import signout_icon from "/signout_icon.svg";
import TodoList from "../components/TodoList";
import FancyBox from "../components/FancyBox";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout } = useAuthContext();

  const f_name = user.displayName.split(" ")[0];

  const handleSignout = () => {
    handleLogout();
  };

  const AccountMenu = (
    <Dropdown>
      <MenuButton
        variant='plain'
        color='plain'
        sx={{
          padding: "0",
        }}
      >
        <img src={menu_icon} alt='=' className='icon' />
      </MenuButton>
      <Menu
        variant='plain'
        size='md'
        sx={{
          padding: "0",
        }}
      >
        <MenuItem variant='plain' color='plain'>
          <span className='menu_item'>
            <p className='email'>{user.email}</p>
          </span>
        </MenuItem>
        <MenuItem variant='soft' color='danger'>
          <button className='menu_item' type='button' onClick={handleSignout}>
            <img src={signout_icon} alt='' className='icon' />
            Sign Out
          </button>
        </MenuItem>
      </Menu>
    </Dropdown>
  );

  // ########### Dashboard ###########

  return (
    <section className='dashboard '>
      <div className='wrapper container flex_between'>
        <div className='account flex_start'>
          <UserAvatar user={user} />

          <div className='acc_info flex_col_start'>
            <h5 className='name'>
              Hey, {f_name}
              <span style={{ fontSize: "18px" }}>👋</span>{" "}
            </h5>
            <span className='greetings'>What's on your mind today?</span>
          </div>
        </div>

        <span className='dropdown'>{AccountMenu}</span>
      </div>

      <div className='content container'>
        {/* <TodoList /> */}
        <FancyBox text='Ongoing Tasks' />
        <FancyBox text='Completed Tasks' />
      </div>
    </section>
  );
}

export default Dashboard;
