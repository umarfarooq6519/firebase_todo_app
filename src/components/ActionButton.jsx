import "../styles/ActionButton.css";

function ActionButton({ text }) {
  return (
    <button className='action_button' type='button'>
      {text}
    </button>
  );
}

export default ActionButton;
