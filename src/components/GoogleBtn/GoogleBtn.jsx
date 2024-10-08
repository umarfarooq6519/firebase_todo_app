import google_icon from "/google_icon.svg";
import "./GoogleBtn.css";

const GoogleBtn = ({ onClick }) => {
  return (
    <button
      type='button'
      className='btn google_btn flex_center'
      onClick={onClick}
    >
      <img src={google_icon} alt='' className='icon' />
      <span className='text'>Continue with Google</span>
    </button>
  );
};

export default GoogleBtn;
