import { motion } from "framer-motion";
import { scaleSpringyAnimation } from "../../utils/animations";

import "./PrimaryBtn.css";

const PrimaryBtn = ({ icon, text }) => {
  return (
    <motion.button
      {...scaleSpringyAnimation}
      type='submit'
      className='btn primary_btn flex_center'
    >
      {icon}
      <span className='text'>{text}</span>
    </motion.button>
  );
};

export default PrimaryBtn;
