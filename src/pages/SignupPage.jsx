import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/SignupPage.css";
import { Divider } from "@mui/joy";

import Dashboard from "./Dashboard";
import EmailPassInput from "../components/EmailPassInput";
import PrimaryBtn from "../components/PrimaryBtn";
import GoogleBtn from "../components/GoogleBtn";
import warning_icon from "/warning_icon.svg";
import signin_icon from "/signin_icon.svg";
import Loading from "../components/Loading";

function SignupPage() {
  // access authContext variables
  const { error, setError, loading, googleSignin, emailSignup } =
    useAuthContext();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await emailSignup(name, email, pass);
      navigate("/dashboard");
    } catch (error) {
      console.log("EmailSignup error: ", error);
    }

    setName("");
    setEmail("");
    setPass("");
  };

  const handleGoogleSignin = async () => {
    try {
      await googleSignin();
      navigate("/dashboard");
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
    <>
      <section className='signup_page'>
        <div className='content container'>
          <h2>Create Account👋</h2>
          <p>
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

          <Divider
            orientation='horizontal'
            sx={{
              marginBlock: "12px",
            }}
          >
            OR
          </Divider>

          <GoogleBtn onClick={handleGoogleSignin} />

          <p className='login_link'>
            Already have an account?
            <Link to='/signin'>Sign-in</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default SignupPage;
