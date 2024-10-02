import arrow_right_light from "/arrow_right_light.svg";

const FancyBoxSmall = ({ text }) => {
  return (
    <div
      onClick={() => alert("done")}
      className='fancy_box fancy_box_small flex_between'
    >
      <h4>{text}</h4>
      <span className='arrow'>
        <img src={arrow_right_light} className='icon' alt='' />
      </span>
    </div>
  );
};

export default FancyBoxSmall;
