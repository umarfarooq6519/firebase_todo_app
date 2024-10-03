import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";
import "../styles/OngoingTasksPage.css";
import { Divider } from "@mui/joy";

import DashboardHeader from "../components/DashboardHeader";
import TodoList from "../components/TodoList";
import Loading from "../components/Loading";
import arrow_left from "/arrow_left.svg";
import { useEffect } from "react";

const OngoingTasksPage = () => {
  const { user, handleLogout, loading } = useAuthContext();
  const { ongoingTasks } = useDBcontext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(ongoingTasks);
  }, [ongoingTasks])

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/");
  }

  //   ############ Ongoing Tasks Page ############

  return (
    <div className='ongoing_tasks_page container'>
      <div className='wrapper container flex_between'>
        <DashboardHeader user={user} handleLogout={handleLogout} />
      </div>

      <Divider
        orientation='horizontal'
        sx={{
          marginBlock: "12px",
        }}
      />

      <span className='tasks_heading flex_start'>
        <Link to='/dashboard'>
          <img src={arrow_left} alt='Go back' className='icon' />
        </Link>
        <h3>Ongoing Tasks</h3>
      </span>

      <div className='content container'>
        <TodoList tasks={ongoingTasks} input={true} />
      </div>
    </div>
  );
};

export default OngoingTasksPage;
