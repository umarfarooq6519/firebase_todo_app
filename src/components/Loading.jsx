import { CircularProgress } from "@mui/joy";

const Loading = () => {
  return (
    <div className='loading flex_center'>
      <CircularProgress color='neutral' size='sm' variant='soft' />
    </div>
  );
};
export default Loading;
