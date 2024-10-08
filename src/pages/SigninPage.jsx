import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy";
import { motion } from "framer-motion";
import { opacityAnimation } from "../utils/animations";

import { useAuthContext } from "../contexts/AuthContext";

import Loading from "../components/Loading/Loading";
import EmailPassInput from "../components/EmailPassInput/EmailPassInput";
import PrimaryBtn from "../components/PrimaryBtn/PrimaryBtn";
import GoogleBtn from "../components/GoogleBtn/GoogleBtn";

import warning_icon from "/warning_icon.svg";
import signin_icon from "/signin_icon.svg";

function SigninPage() {
  const { user, error, setError, loading, googleSignin, emailSignin } =
    useAuthContext(); // access auth.js variables

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");

    // Clear the error message when the component unmounts
    setError("");
  }, [user]);

  // state hooks for form input
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmailSignin = async (e) => {
    // function to handle email signin
    e.preventDefault();
    try {
      const result = await emailSignin(email, pass);
      // go to dashboard if success
      if (result) navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      // reset form input
      setEmail("");
      setPass("");
    }
  };

  const handleGoogleSignin = async () => {
    // function to handle google signin
    try {
      const result = await googleSignin();
      if (result) navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // ############ Signin Page ############

  return (
    <motion.section {...opacityAnimation} className='signin_page'>
      <div className='content container'>
        <h2 className='heading'>
          Continue with <br /> existing Account👋
        </h2>
        <p className='text'>
          Please sign-in to continue. The app will use firebase to fetch your
          data from the cloud.
        </p>
      </div>

      <div className='wrapper container'>
        <form onSubmit={handleEmailSignin} className='login_form'>
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

        <GoogleBtn onClick={handleGoogleSignin} loading={loading} />

        <p className='login_link'>
          Don't have an account?
          <Link to='/'>Sign-up</Link>
        </p>
      </div>
    </motion.section>
  );
}

export default SigninPage;
