import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";
import { Divider } from "@mui/joy";
import "../styles/Dashboard.css";

import Loading from "../components/Loading";
import FancyBox from "../components/FancyBox";
import FancyBoxSmall from "../components/FancyBoxSmall";
import DashboardHeader from "../components/DashboardHeader";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout, loading } = useAuthContext();

  const navigate = useNavigate();

  const { ongoingTasks, completedTasks } = useDBcontext();

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
        <h3 className='heading'>Dashboard</h3>
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
          <FancyBoxSmall text='My Notes' />
          <FancyBoxSmall text='New Task' />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
