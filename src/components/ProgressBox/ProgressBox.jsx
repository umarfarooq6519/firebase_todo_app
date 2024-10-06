import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/joy";

import { useDBcontext } from "../../contexts/DBContext";

import date_icon from "/date_icon.svg";
import "./ProgressBox.css";

const ProgressBox = ({ text }) => {
  const { ongoingTasks, completedTasks } = useDBcontext();
  const [currentDate, setCurrentDate] = useState(new Date()); // State for current date

  const ongoingLength = ongoingTasks.length;

  const completedLength = completedTasks.length;
  const totalTask = ongoingLength + completedLength;
  const completionPercentage =
    totalTask > 0 ? (completedLength / totalTask) * 100 : 0;

  const formatDate = (date) => {
    // defining date format
    const options = {
      day: "numeric",
      month: "short",
      weekday: "short",
    };

    return date.toLocaleDateString("en-us", options);
  };

  const pendingTasks = ongoingLength === 0 ? "no" : ongoingLength;

  const progress_msg =
    ongoingLength === 0
      ? "Great job! You're all caught up!"
      : ongoingLength === 1
      ? "One more to go, you’ve got this!"
      : ongoingLength < 3
      ? "Almost done! Just a few tasks left."
      : ongoingLength < 5
      ? "You're getting there, keep going!"
      : "Many tasks ahead! Keep your focus!";

  // Update the current date every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date()); // Update to the latest date
    }, 60000); // Update every 60 seconds (1 minute)

    return () => clearInterval(interval); // Clean up the interval when component unmounts
  }, []);

  return (
    <div className='progress_box flex_col_between shadow_sm'>
      <span className='heading flex_between'>
        <h4>{text}</h4>
        <p className='date flex_center'>
          <img src={date_icon} className='icon' alt='' />
          {formatDate(currentDate)}
        </p>
      </span>
      <span className='progress flex_between'>
        <span>
          <h3>
            You have {pendingTasks} pending task
            {ongoingTasks.length === 1 ? "" : "s"}
          </h3>
          <p className='text'>{progress_msg}</p>
        </span>

        <span>
          <CircularProgress
            determinate
            size='lg'
            variant='soft'
            color='neutral'
            sx={{
              "--CircularProgress-progressColor": "#222222",
              "--CircularProgress-trackColor": "#d0e9bc",
            }}
            value={completionPercentage}
          >
            {completedLength}/{totalTask}
          </CircularProgress>
        </span>
      </span>
    </div>
  );
};

export default ProgressBox;
