import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/SigninPage.css";
import { Divider } from "@mui/joy";
import Loading from "../components/Loading";

import EmailPassInput from "../components/EmailPassInput";
import PrimaryBtn from "../components/PrimaryBtn";
import GoogleBtn from "../components/GoogleBtn";
import warning_icon from "/warning_icon.svg";
import signin_icon from "/signin_icon.svg";

function SigninPage() {
  // access authContext
  const { user, error, setError, loading, googleSignin, emailSignin } =
    useAuthContext();

  const navigate = useNavigate();

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

  useEffect(() => {
    // Clear the error message when the component unmounts
    setError("");
  }, []);

  if (loading) {
    // return spinner if loading
    return <Loading />;
  }

  // ############ Signin Page ############

  return (
    <section className='signin_page'>
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
          OR
        </Divider>

        <GoogleBtn onClick={handleGoogleSignin} loading={loading} />

        <p className='login_link'>
          Don't have an account?
          <Link to='/'>Sign-up</Link>
        </p>
      </div>
    </section>
  );
}

export default SigninPage;
