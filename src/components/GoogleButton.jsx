import google_icon from "/google_icon.svg";

export default function GoogleButton({ onClick, loading }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='google_button'
      disabled={loading}
    >
      {loading ? (
        <span style={{ position: "relative", left: "-10px" }}>
          <i className='fa-solid fa-spinner fa-pulse'></i>
        </span>
      ) : (
        <img src={google_icon} alt='' className='icon' />
      )}
      Continue with Google
    </button>
  );
}
