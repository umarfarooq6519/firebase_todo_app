import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/SigninPage.css";
import { CircularProgress } from "@mui/joy";

import Dashboard from "./Dashboard";
import EmailPassInput from "../components/EmailPassInput";
import PrimaryBtn from "../components/PrimaryBtn";
import GoogleBtn from "../components/GoogleBtn";
import warning_icon from "/warning_icon.svg";
import signin_icon from "/signin_icon.svg";

function SigninPage() {
  // access authContext variables
  const {
    error,
    loading,
    handleGoogleLogin,
    handleEmailSignin,
    user,
    setError,
  } = useAuthContext();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    await handleEmailSignin(email, pass);

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
      {/* if user is true, load dashboard, else load sign-in page */}
      {user ? (
        <Dashboard />
      ) : (
        <section className='signin_page'>
          <div className='content container'>
            <h2>
              Continue with <br /> existing Account👋
            </h2>
            <p>
              Please sign-in to continue. The app will use firebase to fetch
              your data from the cloud.
            </p>
          </div>

          <div className='wrapper container'>
            <form onSubmit={handleSignin} className='login_form'>
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

            <GoogleBtn onClick={handleGoogleLogin} loading={loading} />

            <p className='login_link'>
              Don't have an account?
              <Link to='/'>Sign-up</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default SigninPage;
