import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";

import ContinueButton from "../components/ContinueButton";
import GoogleButton from "../components/GoogleButton";

function SigninPage() {
  // access authContext variables
  const { error, loading, handleGoogleLogin, handleEmailSignin } =
    useAuthContext();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    handleEmailSignin(email, pass);
  };

  return (
    <section className='signin_page'>
      <div className='content'>
        <h2>Login to existing Account👋</h2>
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
          Already have an account?
          <a href=''>Login Now</a>
        </p>
      </div>
    </section>
  );
}

export default SigninPage;
