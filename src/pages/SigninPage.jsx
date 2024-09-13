import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/SigninPage.css";

import Dashboard from "./Dashboard";
import ContinueButton from "../components/ContinueButton";
import GoogleButton from "../components/GoogleButton";
import EmailPassInput from "../components/EmailPassInput";

function SigninPage() {
  // access authContext variables
  const { error, loading, handleGoogleLogin, handleEmailSignin, user, setError } =
    useAuthContext();

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

  return (
    <>
      {user ? (
        <Dashboard />
      ) : (
        <section className='signin_page'>
          <div className='content'>
            <h2>
              Continue with <br /> existing Account👋
            </h2>
            <p>
              Please signin to continue. The app will use firebase to fetch your
              date from the cloud.
            </p>
          </div>

          <div className='wrapper'>
            <form onSubmit={handleSignin} className='login_form'>
              <EmailPassInput
                email={email}
                setEmail={setEmail}
                pass={pass}
                setPass={setPass}
              />

              <p className='error_msg'>{error}</p>

              <ContinueButton loading={loading} />
            </form>

            <p className='divider'> Or</p>

            <GoogleButton onClick={handleGoogleLogin} loading={loading} />

            <p className='login_link'>
              Don't have an account?
              <Link to='/'>Sign in</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default SigninPage;
