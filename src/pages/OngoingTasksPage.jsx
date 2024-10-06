import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy";

import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";

import Loading from "../components/Loading/Loading";
import MenuBar from "../components/MenuBar/MenuBar";
import TodoList from "../components/TodoList/TodoList";

import arrow_left from "/arrow_left.svg";

const OngoingTasksPage = () => {
  const { user, handleLogout, loading } = useAuthContext();
  const { ongoingTasks } = useDBcontext();
  const navigate = useNavigate();

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
        <MenuBar user={user} handleLogout={handleLogout} />
      </div>

      <Divider
        orientation='horizontal'
        sx={{
          marginBlock: "12px",
        }}
      />

      <div className='tasks_heading flex_start'>
        <Link to='/dashboard'>
          <img src={arrow_left} alt='Go back' className='icon' />
        </Link>
        <h3>Ongoing Tasks</h3>
      </div>

      <div className='content container'>
        <TodoList tasks={ongoingTasks} input={true} />
      </div>
    </div>
  );
};

export default OngoingTasksPage;
