import { Button } from "@mui/joy";

const PrimaryBtn = ({ icon, text }) => {
  return (
    <Button
      type='submit'
      variant='soft'
      sx={{
        backgroundColor: "rgba(var(--global-accent-color-rgb), 0.7)",
        "&:hover": {
          backgroundColor: "var(--global-accent-color)",
        },
      }}
      className='primary_btn'
    >
      {icon}
      <span className='text'>{text}</span>
    </Button>
  );
};

export default PrimaryBtn;
