import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/Dashboard.css";

import close_icon from "/close_icon.svg";
import chats_icon from "/chats_icon.svg";
import plus_icon from "/plus_icon.svg";
import menu_icon from "/menu_icon.svg";
import plane_icon from "/plane_icon.svg";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout } = useAuthContext();

  const [sidebar, setSidebar] = useState(true); // show sidebar state

  return (
    <section className='dashboard'>
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        user={user}
        handleLogout={handleLogout}
      />

      <ChatBox sidebar={sidebar} setSidebar={setSidebar} user={user} />
    </section>
  );
}

// ################ sidebar ##############
const Sidebar = ({ sidebar, setSidebar, user, handleLogout }) => {
  return (
    <div className='sidebar' style={{ display: sidebar ? "flex" : "none" }}>
      <div className='header'>
        <div className='account'>
          {user.photoURL ? (
            <img src={user.photoURL} alt='user' className='img' />
          ) : null}

          <span>
            <h4>{user.displayName}</h4>
            <p>{user.email}</p>
          </span>
        </div>
        <button
          type='button'
          onClick={() => setSidebar(!sidebar)}
          className='close_button'
        >
          <img src={close_icon} alt='X' className='icon' />
        </button>
      </div>

      <div className='chats'>
        <span className='flex_center'>
          <img src={chats_icon} alt='' className='chat_icon' />
          <h3> Recent Chats</h3>
        </span>
        <button type='button' className='new_chat_btn'>
          <img src={plus_icon} alt='+' className='plus_icon' />
        </button>
      </div>

      <button type='button' onClick={handleLogout} className='google_button'>
        Sign Out
      </button>
    </div>
  );
};

// ################ chatbox ##############
const ChatBox = ({ sidebar, setSidebar, user }) => {
  return (
    <div className='chatbox' style={{ display: sidebar ? "none" : "flex" }}>
      <div className='header'>
        <button
          type='button'
          onClick={() => setSidebar(!sidebar)}
          className='close_button'
        >
          <img src={menu_icon} alt='menu' className='icon' />
        </button>
      </div>

      <div className='chat'>
        Hey There! 👋<br /> Tap on <span className='plus_icon'>+</span> icon from the
        sidebar <br /> to get started.
      </div>

      <div className='chat_input'>
        <input
          type='text'
          placeholder='Start typing...'
          name='message'
          id='message'
        />
        <button type='submit' className='send_msg_btn'>
          <img src={plane_icon} alt='send' className='icon' />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
