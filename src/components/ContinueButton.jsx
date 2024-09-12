import "../styles/ContinueButton.css";

function ContinueButton({ loading }) {
  return (
    <button className='continue_button' type='submit' disabled={loading}>
      {loading ? (
        <span style={{ position: "relative", left: "-10px" }}>
          <i className='fa-solid fa-spinner fa-pulse'></i>
        </span>
      ) : null}
      Continue
    </button>
  );
}

export default ContinueButton;
