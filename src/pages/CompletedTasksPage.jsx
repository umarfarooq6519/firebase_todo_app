import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";
import "../styles/CompletedTasksPage.css";
import { Divider } from "@mui/joy";

import DashboardHeader from "../components/DashboardHeader";
import TodoList from "../components/TodoList";
import Loading from "../components/Loading";
import arrow_left from "/arrow_left.svg";

const CompletedTasksPage = () => {
  const { user, handleLogout, loading } = useAuthContext();
  const { completedTasks } = useDBcontext();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/");
  }

  //   ############ Completed Tasks Page ############

  return (
    <div className='completed_tasks_page container'>
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
        <h3>Completed Tasks</h3>
      </span>

      <div className='content container'>
        <TodoList tasks={completedTasks} input={false} />
      </div>
    </div>
  );
};

export default CompletedTasksPage;
