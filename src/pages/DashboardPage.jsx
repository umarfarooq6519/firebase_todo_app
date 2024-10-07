import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, LinearProgress, Snackbar } from "@mui/joy";

import { useDBcontext } from "../contexts/DBContext";

import CreateTask from "../components/CreateTask/CreateTask";
import FancyBox from "../components/FancyBox/FancyBox";
import FancyProgressBox from "../components/ProgressBox/ProgressBox";

import dashboard_icon from "/dashboard_icon.svg";

// ####################

function DashboardPage() {
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
        {snackbar.msg}
      </Snackbar>
    );
  };

  // ########### Dashboard ###########

  return (
    <>
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
                handleClick={() => navigate("/dashboard/ongoing")}
                text='Ongoing Tasks'
                tasks='ongoing'
              />
              <FancyBox
                handleClick={() => navigate("/dashboard/completed")}
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
    </>
  );
}

export default DashboardPage;
