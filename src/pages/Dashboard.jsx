import { useAuthContext } from "../contexts/AuthContext";
import "../styles/Dashboard.css";

import SecondaryBtn from "../components/SecondaryBtn";
import { Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";
import UserAvatar from "../components/UserAvatar";

import menu_icon from "/menu_icon.svg";
import signout_icon from "/signout_icon.svg";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout } = useAuthContext();

  const f_name = user.displayName.split(" ")[0];

  const handleSignout = () => {
    handleLogout();
  };

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

        <span className='dropdown'>
          <Dropdown>
            <MenuButton variant='plain' color='plain'>
              <img src={menu_icon} alt='=' className='icon' />
            </MenuButton>
            <Menu
              variant='plain'
              size='lg'
              sx={{
                padding: "0px",
              }}
            >
              <MenuItem
                variant='soft'
                color='danger'
                sx={{
                  padding: "0px",
                }}
              >
                <button
                  className='menu-item'
                  type='button'
                  onClick={handleSignout}
                >
                  <img src={signout_icon} alt='' className='icon' />
                  Sign Out
                </button>
              </MenuItem>
            </Menu>
          </Dropdown>
        </span>

        {/* <img src={menu_icon} alt='=' className='icon' /> */}
      </div>

      {/* <div className='content container'>
        <SecondaryBtn
          onClick={handleSignout}
          text='Sign Out'
          icon={<img src={signout_icon} alt='' className='icon' />}
        />
      </div> */}
    </section>
  );
}

export default Dashboard;
