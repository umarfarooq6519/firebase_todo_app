import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, LinearProgress, Snackbar } from "@mui/joy";
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
import NewTask from "../components/NewTask";

// ####################

function Dashboard() {
  const { user, loading } = useAuthContext();
  const { taskLoading } = useDBcontext();
  const [text, setText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, color: "", msg: "" });

  const navigate = useNavigate();

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

        {taskLoading ? (
          <LinearProgress thickness={2} color='neutral' variant='soft' />
        ) : (
          <>
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
          </>
        )}

        <SnackbarAlert />

        <NewTask setSnackbar={setSnackbar} />
      </div>
    </section>
  );
}

export default Dashboard;
