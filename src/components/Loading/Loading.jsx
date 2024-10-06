import { CircularProgress } from "@mui/joy";

const Loading = () => {
  return (
    <div className='flex_center'>
      <CircularProgress color='neutral' size='sm' variant='soft' />
    </div>
  );
};
export default Loading;
