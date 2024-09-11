import "./styles/App.css";

// ##### page imports #####
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import useAuth from "./auth";

function App() {
  // importing auth functions
  const {
    user,
    handleGoogleLogin,
    handleEmailLogin,
    handleLogout,
    error,
    loading,
  } = useAuth();

  return (
    <section className='app'>
      {/* passing data as props bcz I dont know how to use contexts :( */}
      {user ? (
        <Dashboard
          handleLogout={handleLogout}
          user={user}
          error={error}
          loading={loading}
        />
      ) : (
        <LoginPage
          handleGoogleLogin={handleGoogleLogin}
          handleEmailLogin={handleEmailLogin}
          error={error}
          loading={loading}
        />
      )}
    </section>
  );
}

export default App;
