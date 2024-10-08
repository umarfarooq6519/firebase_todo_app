import "./SecondaryBtn.css";
import { motion } from "framer-motion";
import { scaleSpringyAnimation } from "../../utils/animations";

const SecondaryBtn = ({ onClick, icon, text }) => {
  return (
    <motion.button
      {...scaleSpringyAnimation}
      type='button'
      onClick={onClick}
      className='btn secondary_btn flex_center'
    >
      {icon}
      <h5 className='text'>{text}</h5>
    </motion.button>
  );
};

export default SecondaryBtn;
