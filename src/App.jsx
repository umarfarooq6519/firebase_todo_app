import { useAuthContext } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import "./styles/App.css";

import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";

function App() {
  // access authContext variables
  const { user, loading } = useAuthContext();

  if (loading) {
    // Show a loading indicator while auth status is being determined
    return <div className='loading'>Loading...</div>;
  }

  if (user) {
    // If user is authenticated, navigate to dashboard
    return <Dashboard />;
  }

  // If no user and loading is complete, show the signup page
  return <SignupPage />;
}

export default App;
