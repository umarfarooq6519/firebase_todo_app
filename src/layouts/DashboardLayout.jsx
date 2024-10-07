import { Outlet } from "react-router-dom";
import { Divider } from "@mui/joy";

import { useAuthContext } from "../contexts/AuthContext";

import Loading from "../components/Loading/Loading";
import MenuBar from "../components/MenuBar/MenuBar";

// #################################

const DashboardLayout = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // if no user found, go back to sign-in page
    navigate("/");
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
