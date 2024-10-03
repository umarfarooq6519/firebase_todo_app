import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
// prompts user to select an account to login with
googleProvider.setCustomParameters({
  prompt: "select_account",
});

function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (user) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(user);
    }
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

  const emailSignin = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result) {
        setError("");
        setUser(result.user);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("The email address is invalid!");
          break;
        case "auth/invalid-credential":
          setError("The credentials could not be found!");
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

  const emailSignup = async (name, email, password) => {
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
        setUser({ ...result.user, displayName: name });
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("The email address is invalid!");
          break;
        case "auth/weak-password":
          setError("The password should be atleast 6 characters!");
          break;
        case "auth/email-already-in-use":
          setError("This email address is already in use!");
          break;
        default:
          setError("Unknown error creating account!");
          break;
      }
      console.log("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        setUser(result.user);
      }
    } catch (error) {
      setError("An error occured, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    error,
    setError,
    loading,
    googleSignin,
    emailSignup,
    emailSignin,
    handleLogout,
  };
}

export default useAuth;
