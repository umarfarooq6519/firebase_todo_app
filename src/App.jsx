import "./styles/App.css";

// ##### page imports #####
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import useAuth from "./auth";

function App() {
  // importing auth functions
  const { user, handleGoogleLogin, handleEmailLogin, handleLogout, error } =
    useAuth();

  return (
    <section className='app'>
      {user ? (
        <Dashboard handleLogout={handleLogout} user={user} error={error} />
      ) : (
        <LoginPage
          handleGoogleLogin={handleGoogleLogin}
          handleEmailLogin={handleEmailLogin}
          error={error}
        />
      )}
    </section>
  );
}

export default App;
