import google_icon from "/google_icon.svg";

export default function GoogleButton({ onClick }) {
  return (
    <button type='button' onClick={onClick} className='fancy_button'>
      <img src={google_icon} alt='' className='icon' />
      Continue with Google
    </button>
  );
}
