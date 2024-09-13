import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/SignupPage.css";

import EmailPassInput from "../components/EmailPassInput";
import ContinueButton from "../components/ContinueButton";
import GoogleButton from "../components/GoogleButton";

function SignupPage() {
  // using authContext variables
  const { handleGoogleLogin, handleEmailSignup, error, loading, setError } =
    useAuthContext();

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

  return (
    <section className='signup_page app'>
      <div className='content'>
        <h2>Create Account👋</h2>
        <p>
          Please signup to continue. The app will use firebase to save your data
          on cloud.
        </p>
      </div>

      <div className='wrapper'>
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

          <p className='error_msg'>{error}</p>

          <ContinueButton loading={loading} />
        </form>

        <p className='divider'> Or</p>

        <GoogleButton onClick={handleGoogleLogin} loading={loading} />

        <p className='login_link'>
          Already have an account?
          <Link to='/signin'>Sign in</Link>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;
