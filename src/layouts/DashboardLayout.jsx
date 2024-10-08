import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy";

import { useAuthContext } from "../contexts/AuthContext";
import { useDBcontext } from "../contexts/DBContext";

import Loading from "../components/Loading/Loading";
import MenuBar from "../components/MenuBar/MenuBar";

// #################################

const DashboardLayout = () => {
  const { user, loading } = useAuthContext();
  const { taskLoading } = useDBcontext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  if (loading || taskLoading) {
    return <Loading />;
  }

  //   ############# Dashboard Layout ##############

  return (
    <section className='dashboard'>
      <div className='wrapper'>
        <MenuBar />
      </div>

      <Divider
        orientation='horizontal'
        sx={{
          marginBlock: "12px",
        }}
      />

      <div className='content container'>
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
