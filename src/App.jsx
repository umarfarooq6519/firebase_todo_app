import { useAuthContext } from "./contexts/AuthContext";

import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";

function App() {
  // access authContext variables
  const { user } = useAuthContext();

  if (user) {
    // If user is authenticated, navigate to dashboard
    return <Dashboard />;
  }

  // If no user and loading is complete, show the signup page
  return <SignupPage />;
}

export default App;
