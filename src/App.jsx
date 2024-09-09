import "./styles/App.css";

// ##### firebase imports #####
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

// ##### page imports #####
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Signout successfull");
      })
      .catch((error) => console.log("Can't sign out: ", error));
  };

  const handleLogin = () => {
    //  handles login function
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        if (result) setUser(result.user);
      })
      .catch((error) => console.log("Error signing in: ", error));
  };

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
