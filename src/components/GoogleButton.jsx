import google_icon from "/google_icon.svg";
import "../styles/GoogleButton.css";

export default function GoogleButton({ onClick }) {
  return (
    <button type='button' onClick={onClick} className='google_button'>
      <img src={google_icon} alt='' className='icon' />
      Continue with Google
    </button>
  );
}
