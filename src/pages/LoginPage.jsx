// TODO: add messages to indicate user of 'already in use email address' & 'invalid email address' errors

import "../styles/LoginPage.css";

import google_icon from "/google_icon.svg";
import { useState } from "react";

function LoginPage({ handleGoogleLogin, handleEmailLogin, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    handleEmailLogin(name, email, pass);
  };

  return (
    <section className='login_page'>
      <div className='content'>
        <h2>Create Account👋</h2>
        <p>
          Please login to continue. The app will use firebase to save your data
          on cloud.
        </p>
      </div>

      <div className='wrapper'>
        <form onSubmit={handleLogin} className='login_form'>
          <input
            type='text'
            placeholder='your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='user_name'
            required
          />

          <input
            type='text'
            placeholder='example@website.com'
            name='user_email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type='password'
            placeholder='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            name='user_pass'
            required
          />

          <p className='error_msg'>{error}</p>

          <button className='action_button' type='submit'>
            Continue
          </button>
        </form>

        <p className='divider'> Or</p>

        <button
          type='button'
          onClick={handleGoogleLogin}
          className='google_button'
        >
          <img src={google_icon} alt='' className='icon' />
          Continue with Google
        </button>
      </div>
    </section>
  );
}

export default LoginPage;
