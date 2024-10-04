import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";
import { CircularProgress, Divider } from "@mui/joy";
import "../styles/Dashboard.css";

import Loading from "../components/Loading";
import FancyBox from "../components/FancyBox";
import FancyBoxSmall from "../components/FancyBoxSmall";
import DashboardHeader from "../components/DashboardHeader";

import dashboard_icon from "/dashboard_icon.svg";
import ProgressBox from "../components/ProgressBox";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout, loading } = useAuthContext();

  const navigate = useNavigate();

  const handleOngoingClick = () => {
    navigate("/ongoing_tasks");
  };
  const handleCompletedClick = () => {
    navigate("/completed_tasks");
  };

  if (loading) {
    // wait till authStateChange loads
    return <Loading />;
  }

  if (!user) {
    // if no user found, go back to '/'
    navigate("/");
  }

  // ########### Dashboard ###########

  return (
    <section className='dashboard'>
      <div className='wrapper'>
        <DashboardHeader user={user} handleLogout={handleLogout} />
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
          {/* <FancyBoxSmall text='Progress' />
          <FancyBoxSmall text='New Task' /> */}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
