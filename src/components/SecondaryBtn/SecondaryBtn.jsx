import "./SecondaryBtn.css";

const SecondaryBtn = ({ onClick, icon, text }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='btn secondary_btn flex_center'
    >
      {icon}
      <h5 className='text'>{text}</h5>
    </button>
  );
};

export default SecondaryBtn;
