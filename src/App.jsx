import { useAuthContext } from "./contexts/AuthContext";
import "./styles/App.css";

import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";

function App() {
  // access authContext variables
  const { user } = useAuthContext();

  return (
    <section className='app'>
      {/* passing data as contexts */}
      {user ? <Dashboard /> : <SignupPage />}
    </section>
  );
}

export default App;
