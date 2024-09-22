import { useAuthContext } from "../contexts/AuthContext";
import "../styles/Dashboard.css";

import { Avatar } from "@mui/joy";
import { Button, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";

import menu_icon from "/menu_icon.svg";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout } = useAuthContext();

  // for users with no photoUrl, display their initial
  const userInitial = user.displayName.charAt(0);
  const f_name = user.displayName.split(" ")[0];

  const signoutHandle = () => {
    handleLogout();
  };

  return (
    <section className='dashboard '>
      <div className='wrapper container flex_between'>
        <div className='account flex_start'>
          {user.photoURL ? (
            <Avatar className='avatar' size='lg' src={user.photoURL} />
          ) : (
            <Avatar variant='soft' className='avatar' color='danger'>
              {userInitial}
            </Avatar>
          )}

          <div className='acc_info flex_col_start'>
            <span className='name'>
              Hi, {f_name}!<span style={{ fontSize: "19px" }}>👋</span>{" "}
            </span>
            <span className='email'>What's on your mind today?</span>
          </div>
        </div>

        <img src={menu_icon} alt='=' className='icon' />
      </div>

      <div className='content container'>
        <Button
          type='button'
          variant='soft'
          color='warning'
          onClick={signoutHandle}
          className='fancy_button signout_btn'
        >
          Sign Out
        </Button>
      </div>
      {/* <Button onClick={function(){}} variant="soft" /> */}
    </section>
  );
}

export default Dashboard;
