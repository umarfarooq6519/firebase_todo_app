import "./PrimaryBtn.css";

const PrimaryBtn = ({ icon, text }) => {
  return (
    <button type='submit' className='btn primary_btn flex_center'>
      {icon}
      <span className='text'>{text}</span>
    </button>
  );
};

export default PrimaryBtn;
