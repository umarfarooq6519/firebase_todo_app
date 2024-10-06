import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, LinearProgress, Snackbar } from "@mui/joy";

import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";

import Loading from "../components/Loading/Loading";
import CreateTask from "../components/CreateTask/CreateTask";
import FancyBox from "../components/FancyBox/FancyBox";
import MenuBar from "../components/MenuBar/MenuBar";
import FancyProgressBox from "../components/ProgressBox/ProgressBox";

import dashboard_icon from "/dashboard_icon.svg";

// ####################

function DashboardPage() {
  const { user, loading } = useAuthContext();
  const { taskLoading } = useDBcontext();
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

  if (loading) {
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
        <MenuBar />
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
            <div className='main_menu'>
              <div className='row_1'>
                <FancyProgressBox text='Your Progress' />
              </div>
              <div className='row_2'>
                <FancyBox
                  handleClick={() => navigate("/ongoing")}
                  text='Ongoing Tasks'
                  tasks='ongoing'
                />
                <FancyBox
                  handleClick={() => navigate("/completed")}
                  text='Completed Tasks'
                  tasks='completed'
                />
              </div>
            </div>
          </>
        )}

        <SnackbarAlert />

        <div className='create_task_wrapper'>
          <CreateTask setSnackbar={setSnackbar} />
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
