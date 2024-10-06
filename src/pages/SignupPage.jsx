import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy";

import { useAuthContext } from "../contexts/AuthContext";

import Loading from "../components/Loading/Loading";
import EmailPassInput from "../components/EmailPassInput/EmailPassInput";
import PrimaryBtn from "../components/PrimaryBtn/PrimaryBtn";
import GoogleBtn from "../components/GoogleBtn/GoogleBtn";

import warning_icon from "/warning_icon.svg";
import signin_icon from "/signin_icon.svg";

// ###############################

function SignupPage() {
  const { error, setError, loading, googleSignin, emailSignup } =
    useAuthContext(); // access auth.js variables

  const navigate = useNavigate();

  // state hooks for form input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmailSignup = async (e) => {
    // function to handle email signup
    e.preventDefault();
    try {
      const result = await emailSignup(name, email, pass);
      // go to dashboard if success
      if (result) navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      // reset form input
      setName("");
      setEmail("");
      setPass("");
    }
  };

  const handleGoogleSignin = async () => {
    // function to handle google signin
    try {
      const result = await googleSignin();
      // go to dashboard if success
      if (result) navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Clear the error message when the component unmounts
    setError("");
  }, []);

  if (loading) {
    return <Loading />;
  }

  // ############ Signup Page ############

  return (
    <section className='signup_page'>
      <div className='content container'>
        <h2 className='heading'>Create Account👋</h2>
        <p className='text'>
          Please sign-up to continue. The app will use firebase to save your
          data on cloud.
        </p>
      </div>

      <div className='wrapper container'>
        <form onSubmit={handleEmailSignup} className='login_form'>
          <input
            type='text'
            placeholder='your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='user_name'
            required
          />

          {/* email & password component */}
          <EmailPassInput
            email={email}
            setEmail={setEmail}
            pass={pass}
            setPass={setPass}
          />

          <p className='error_msg flex_start'>
            {/* display error if anything goes wrong */}
            {error ? <img src={warning_icon} alt='' className='icon' /> : null}
            {error}
          </p>

          <PrimaryBtn
            text='Continue'
            icon={<img src={signin_icon} className='icon'></img>}
          />
        </form>

        <Divider
          orientation='horizontal'
          sx={{
            marginBlock: "12px",
          }}
        >
          Or
        </Divider>

        <GoogleBtn onClick={handleGoogleSignin} />

        <p className='login_link'>
          Already have an account?
          <Link to='/signin'>Sign-in</Link>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;
