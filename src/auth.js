import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
// prompts user to select an account to login with
googleProvider.setCustomParameters({
  prompt: "select_account",
});

function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        setError("");
        console.log("Signout successfull");
      })
      .catch((error) => {
        setError(`Can't sign out!`);
      })
      .finally(() => setLoading(false));
  };

  const handleEmailSignin = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result) {
        setError("");
        setUser(result.user);
      }
    } catch (error) {
      // setError("Error in signin");
      console.log("Error in signin: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result) {
        setError("");
        // update users display name
        await updateProfile(result.user, {
          displayName: name,
        });
        setUser(result.user);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email address is already in use!");
          break;
        case "auth/invalid-email":
          setError("This email address is invalid!");
          break;

        default:
          setError("Unknown error signing in!");
          break;
      }
      console.log("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        setUser(result.user);
      }
    } catch (error) {
      console.log("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    handleGoogleLogin,
    handleLogout,
    handleEmailSignup,
    handleEmailSignin,
    error,
    loading,
  };
}

export default useAuth;
