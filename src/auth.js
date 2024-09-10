import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
// prompts user to select an account to login with
googleProvider.setCustomParameters({
  prompt: "select_account",
});

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("Signout successfull");
      })
      .catch((error) => console.log("Can't sign out: ", error));
  };

  const handleEmailLogin = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result) {
        // update users display name
        await updateProfile(result.user, {
          displayName: name,
        });
        setUser(result.user);
      }
    } catch (error) {
      console.log("Error signing in", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        setUser(result.user);
      }
    } catch (error) {
      console.log("Error signing in: ", error);
    }
  };

  return { user, handleGoogleLogin, handleLogout, handleEmailLogin };
}

export default useAuth;
