import { Button } from "@mui/joy";
import google_icon from "/google_icon.svg";

const GoogleBtn = ({ onClick }) => {
  return (
    <Button
      type='button'
      className='google_btn'
      onClick={onClick}
      variant='outline'
      color='neutral'
    >
      <img src={google_icon} alt='' className='icon' />
      <span className='text'>Continue with Google</span>
    </Button>
  );
};

export default GoogleBtn;
