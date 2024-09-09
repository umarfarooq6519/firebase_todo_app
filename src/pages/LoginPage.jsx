import "../styles/LoginPage.css";

import ActionButton from "../components/ActionButton";
import google_icon from "/google_icon.svg";

function LoginPage({ handleLogin, user }) {
  return (
    <section className='login_page'>
      <div className='content'>
        {user ? user.email : "Signed out"}
        <h2>Create Account👋</h2>
        <p>
          Please login to continue. The app will use firebase to save your data
          on cloud.
        </p>
      </div>

      <div className='wrapper'>
        <form action='' method='POST' className='login_form'>
          <input type='text' placeholder='full name' name='user_name' />

          <input
            type='text'
            placeholder='example@website.com'
            name='user_email'
          />

          <input type='password' placeholder='password' name='user_pass' />

          <span>
            <ActionButton text='Continue' />
          </span>
        </form>

        <p className='with-lines'> Or</p>

        <button type='button' onClick={handleLogin} className='google_button'>
          <img src={google_icon} alt='' className='icon' />
          Continue with Google
        </button>
      </div>
    </section>
  );
}

export default LoginPage;
