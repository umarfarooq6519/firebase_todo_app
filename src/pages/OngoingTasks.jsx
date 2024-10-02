import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/OngoingTasks.css";
import { Divider } from "@mui/joy";

import DashboardHeader from "../components/DashboardHeader";
import TodoList from "../components/TodoList";
import Loading from "../components/Loading";

const OngoingTasks = () => {
  const { user, handleLogout, loading } = useAuthContext();

  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    navigate("/");
  }

  return (
    <div className='ongoing_tasks container'>
      <div className='wrapper container flex_between'>
        <DashboardHeader user={user} handleLogout={handleLogout} />
      </div>

      <Divider
        orientation='horizontal'
        sx={{
          marginBlock: "12px",
        }}
      />

      <div className='content container'>
        <TodoList />
      </div>
    </div>
  );
};

export default OngoingTasks;
