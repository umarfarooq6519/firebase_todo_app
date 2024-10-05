import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Snackbar } from "@mui/joy";
// contexts
import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";
// components
import Loading from "../components/Loading";
import FancyBox from "../components/FancyBox";
import DashboardHeader from "../components/DashboardHeader";
import ProgressBox from "../components/ProgressBox";
// assets
import "../styles/Dashboard.css";
import dashboard_icon from "/dashboard_icon.svg";
import send_icon from "/send_icon.svg";

// ####################

function Dashboard() {
  const { user, loading } = useAuthContext();
  const { addTask, taskLoading } = useDBcontext();
  const [text, setText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, color: "" });

  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    // function to handle add task
    e.preventDefault();
    if (text.trim() === "") return; // if empty don't do anything
    setSnackbar({ open: true, color: "success" });
    let time = new Date();
    setText("");
    await addTask(text, time);

    setTimeout(() => {
      // Set snackbar to false after 1.5s
      setSnackbar({ open: false, color: "" });
    }, 1500);
  };

  const SnackbarAlert = () => {
    return (
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        color={snackbar.color ? snackbar.color : "neutral"}
        variant='soft'
        sx={{
          minWidth: "fit-content",
          border: "1px solid currentColor",
          padding: "10px 20px",
        }}
      >
        {snackbar.color === "success" ? "Task Added!" : "Task Removed!"}
      </Snackbar>
    );
  };

  const handleOngoingClick = () => {
    // navigate to link
    navigate("/ongoing_tasks");
  };
  const handleCompletedClick = () => {
    // navigate to link
    navigate("/completed_tasks");
  };

  if (loading) {
    // wait till authStateChange loads
    return <Loading />;
  }

  if (!user) {
    // if no user found, go back to sign-in page
    navigate("/");
  }

  // ########### Dashboard ###########

  return (
    <section className='dashboard'>
      <div className='wrapper'>
        <DashboardHeader />
      </div>

      <Divider
        orientation='horizontal'
        sx={{
          marginBlock: "12px",
        }}
      />

      <div className='content container'>
        <h3 className='heading flex_start'>
          <img src={dashboard_icon} className='icon' alt='' /> Dashboard
        </h3>

        <ProgressBox text='Your Progress' />

        <div className='main_menu'>
          <FancyBox
            text='Ongoing Tasks'
            handleClick={handleOngoingClick}
            tasks='ongoing'
          />
          <FancyBox
            text='Completed Tasks'
            handleClick={handleCompletedClick}
            tasks='completed'
          />
        </div>

        <SnackbarAlert />

        <form onSubmit={handleAddTask} className='todo_form'>
          <div className='input_container'>
            <input
              type='text'
              disabled={taskLoading}
              onChange={(e) => setText(e.target.value)}
              value={text}
              className='input shadow_sm'
              placeholder='Add new task...'
            />
            <button type='submit' className='icon_wrapper'>
              <img src={send_icon} alt='send' className='icon' />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Dashboard;
