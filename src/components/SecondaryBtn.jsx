import { Button } from "@mui/joy";

const SecondaryBtn = ({ onClick, icon, text }) => {
  return (
    <Button
      type='button'
      variant='soft'
      color='warning'
      onClick={onClick}
      className='secondary_btn'
    >
      {icon}
      <span className='text'>{text}</span>
    </Button>
  );
};

export default SecondaryBtn;
