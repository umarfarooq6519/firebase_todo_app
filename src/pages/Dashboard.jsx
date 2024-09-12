import { useAuthContext } from "../contexts/AuthContext";

function Dashboard() {
  // access authContext variables
  const { user, handleLogout } = useAuthContext();

  return (
    <section className='dashboard'>
      <h2>Welcome {user.displayName}</h2>

      <button type='button' onClick={handleLogout} className='google_button'>
        Sign Out
      </button>
    </section>
  );
}

export default Dashboard;
