import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/SignupPage.css";
import { CircularProgress } from "@mui/joy";

import Dashboard from "./Dashboard";
import EmailPassInput from "../components/EmailPassInput";
import PrimaryBtn from "../components/PrimaryBtn";
import GoogleBtn from "../components/GoogleBtn";
import warning_icon from "/warning_icon.svg";
import signin_icon from "/signin_icon.svg";

function SignupPage() {
  // access authContext variables
  const {
    handleGoogleLogin,
    handleEmailSignup,
    error,
    loading,
    setError,
    user,
  } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await handleEmailSignup(name, email, pass);

    setName("");
    setEmail("");
    setPass("");
  };

  useEffect(() => {
    // Clear the error message when the component unmounts
    setError("");
  }, []);

  if (loading) {
    return (
      <div className='loading flex_center'>
        <CircularProgress color='neutral' size='sm' variant='soft' />
      </div>
    );
  }

  return (
    <>
      {/* if user is true, load dashboard, else load sign-up page */}
      {user ? (
        <Dashboard />
      ) : (
        <section className='signup_page'>
          <div className='content container'>
            <h2>Create Account👋</h2>
            <p>
              Please sign-up to continue. The app will use firebase to save your
              data on cloud.
            </p>
          </div>

          <div className='wrapper container'>
            <form onSubmit={handleSignup} className='login_form'>
              <input
                type='text'
                placeholder='your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                name='user_name'
                required
              />

              <EmailPassInput
                email={email}
                setEmail={setEmail}
                pass={pass}
                setPass={setPass}
              />

              <p className='error_msg flex_start'>
                {error ? (
                  <img src={warning_icon} alt='' className='icon' />
                ) : null}
                {error}
              </p>

              <PrimaryBtn
                text='Continue'
                icon={<img src={signin_icon} className='icon'></img>}
              />
            </form>

            <p className='divider'> Or</p>

            <GoogleBtn onClick={handleGoogleLogin} />

            <p className='login_link'>
              Already have an account?
              <Link to='/signin'>Sign-in</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default SignupPage;
