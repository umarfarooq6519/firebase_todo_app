import "./styles/App.css";

// ##### page imports #####
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import useAuth from "./auth";

function App() {
  // importing auth functions
  const { user, handleLogin, handleLogout } = useAuth();

  return (
    <section className='app'>
      {user ? (
        <Dashboard handleLogout={handleLogout} user={user} />
      ) : (
        <LoginPage handleLogin={handleLogin} user={user} />
      )}
    </section>
  );
}

export default App;
