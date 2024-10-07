import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy";

import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";

import Loading from "../components/Loading/Loading";
import MenuBar from "../components/MenuBar/MenuBar";
import TodoList from "../components/TodoList/TodoList";

import arrow_left from "/arrow_left.svg";

const CompletedTasksPage = () => {
  const { user, handleLogout, loading } = useAuthContext();
  const { completedTasks } = useDBcontext();
  const navigate = useNavigate();

  //   ############ Completed Tasks Page ############

  return (
    <div className='completed_tasks container'>
      <span className='wrapper flex_start'>
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
