import { CircularProgress } from "@mui/joy";

import arrow_right_light from "/arrow_right_light.svg";

const FancyBox = ({ text }) => {
  return (
    <div onClick={() => alert("done")} className='fancy_box flex_col_between'>
      <h4>{text}</h4>
      <ul className='tasks'>
        <li>
          <p>This is a task</p>
        </li>
        <li>
          <p>This is a task</p>
        </li>
        <li>
          <p>This is a task</p>
        </li>
      </ul>
      <span className='arrow'>
        <img src={arrow_right_light} className='icon' alt='' />
      </span>
    </div>
  );
};

export default FancyBox;
