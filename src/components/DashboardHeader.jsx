import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";

import UserAvatar from "./UserAvatar";
import signout_icon from "/signout_icon.svg";
import menu_icon from "/menu_icon.svg";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuthContext();

  const f_name = user.displayName.split(" ")[0];
  const email = user.email;

  const handleSignout = async () => {
    try {
      await handleLogout();
      navigate("/signin");
    } catch (error) {
      console.log("handleSignout() error", error);
    }
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
            {/* <p className='email'>{email}</p> */}
            <p className='email'>{email}</p>
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

  return (
    <>
      <div className='dashboard_header container flex_between'>
        <div className='account flex_start'>
          <UserAvatar user={user} />

          <div className='acc_info flex_col_start'>
            <h5 className='name'>
              Hey, {f_name}
              <span>👋</span>
            </h5>
            <p className='greetings'>What's on your mind today?</p>
          </div>
        </div>

        <span className='dropdown'>{AccountMenu}</span>
      </div>
    </>
  );
};

export default DashboardHeader;
