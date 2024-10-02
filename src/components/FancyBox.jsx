import arrow_right_light from "/arrow_right_light.svg";

const FancyBox = ({ text, handleClick }) => {
  const text1 = text.split(" ")[0];
  const text2 = text.split(" ")[1];

  return (
    <div onClick={handleClick} className='fancy_box flex_col_between'>
      <h4>
        {text1} <br /> {text2}
      </h4>
      <ul className='tasks'>
        <li>
          <p>Lorem ipsum dolor sit amet. </p>
        </li>
        <li>
          <p>Lorem ipsum sit.</p>
        </li>
        <li>
          <p>Lorem ipsum consectetur.</p>
        </li>
      </ul>
      <span className='arrow'>
        <img src={arrow_right_light} className='icon' alt='' />
      </span>
    </div>
  );
};

export default FancyBox;
