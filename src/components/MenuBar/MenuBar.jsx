import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";
import { motion } from "framer-motion";
import {
  scaleSpringyAnimation,
  fromTopAnimation,
  opacityAnimation,
} from "../../utils/animations";

import UserAvatar from "../UserAvatar/UserAvatar";

import signout_icon from "/signout_icon.svg";
import menu_icon from "/menu_icon.svg";
import "./MenuBar.css";

// #########################################

function MenuBar() {
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

  // ################### MenuBar #####################

  return (
    <div className='menu_bar container flex_between'>
      <div className='content flex_start'>
        <motion.span {...scaleSpringyAnimation} className='avatar_wrapper'>
          <UserAvatar user={user} />
        </motion.span>

        <motion.div
          className='account flex_col_start'
          style={{ overflow: "hidden" }}
        >
          <motion.h5 {...fromTopAnimation} className='name'>
            Hey, {f_name}👋
          </motion.h5>
          <p className='greetings'>What's on your mind today?</p>
        </motion.div>
      </div>

      <motion.span {...scaleSpringyAnimation} className='dropdown'>
        <AccDropdown onClick={handleSignout} email={email} />
      </motion.span>
    </div>
  );
}

// ####################################################

const AccDropdown = ({ onClick, email }) => {
  // Account Dropdown Component
  return (
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
        sx={{ padding: "0", position: "absolute" }}
      >
        <MenuItem variant='plain' color='plain'>
          <motion.span {...scaleSpringyAnimation} className='menu_item'>
            <p className='email'>{email}</p>
          </motion.span>
        </MenuItem>
        <MenuItem variant='soft' color='danger'>
          <motion.button
            {...scaleSpringyAnimation}
            className='menu_item'
            type='button'
            onClick={onClick}
          >
            <img src={signout_icon} alt='' className='icon' />
            Sign Out
          </motion.button>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default MenuBar;
