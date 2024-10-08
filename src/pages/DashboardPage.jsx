import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { opacityAnimation } from "../utils/animations";

import CreateTask from "../components/CreateTask/CreateTask";
import FancyBox from "../components/FancyBox/FancyBox";
import FancyProgressBox from "../components/ProgressBox/ProgressBox";
import SnackbarComponent from "../components/Snackbar/Snackbar";

import dashboard_icon from "/dashboard_icon.svg";

// ####################

function DashboardPage() {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    color: "",
    msg: "",
  });

  const navigate = useNavigate();

  const staggerAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childAnimation = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  // ############# Dashboard ##############

  return (
    <>
      <div className='heading_animation' style={{ overflow: "hidden" }}>
        <motion.h3 {...opacityAnimation} className='heading flex_start'>
          <img src={dashboard_icon} className='icon' alt='' /> Dashboard
        </motion.h3>
      </div>

      <motion.div
        className='main_menu'
        variants={staggerAnimation}
        initial='hidden' // Updated from 'initial'
        animate='show' // Updated from 'animate'
      >
        <motion.div className='row_1' variants={childAnimation}>
          <FancyProgressBox text='Your Progress' />
        </motion.div>
        <motion.div className='row_2' variants={childAnimation}>
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
        </motion.div>
      </motion.div>

      <SnackbarComponent snackbarState={snackbarState} />

      <div className='create_task_wrapper'>
        <CreateTask setSnackbarState={setSnackbarState} />
      </div>
    </>
  );
}

export default DashboardPage;
