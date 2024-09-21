import { useAuthContext } from "../contexts/AuthContext";
import "../styles/Dashboard.css";

import { Avatar } from "@mui/joy";
import { Button } from "@mui/joy";
import menu_icon from "/menu_icon.svg";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout } = useAuthContext();

  // for users with no photoUrl, display their initial
  const userInitial = user.displayName.charAt(0);

  const signoutHandle = () => {
    handleLogout();
  };

  return (
    <section className='dashboard '>
      <div className='wrapper container flex_between'>
        <div className='account flex_center'>
          {user.photoURL ? (
            <Avatar color='neutral' variant='soft' src={user.photoURL} />
          ) : (
            <Avatar variant='soft' color='danger'>
              {userInitial}
            </Avatar>
          )}

          <span className='name'>{user.displayName}</span>
        </div>
        <div className='menu'>
          <img src={menu_icon} alt='=' className='icon' />
        </div>
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
