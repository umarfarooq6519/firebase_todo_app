import { useEffect, useState } from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import { motion } from "framer-motion";
import {
  opacityAnimation,
  scaleSpringyAnimation,
} from "../../utils/animations";

import { useDBcontext } from "../../contexts/DBContext";
import parseFormatDate from "../../utils/dateUtils";

import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

import plus_icon from "/plus_icon.svg";
import "./CreateTask.css";
import SnackbarComponent from "../Snackbar/Snackbar";

function CreateTask() {
  const { addTask } = useDBcontext();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    color: "",
    msg: "",
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const formattedDate = parseFormatDate(desc);
    setDueDate(formattedDate);
  }, [desc]);

  const handleAddTask = async (e) => {
    // function to handle add task
    e.preventDefault();
    try {
      // if empty don't do anything
      if (title.trim() === "" && desc.trim() === "") return;
      const createdAt = new Date();
      setSnackbarState({ open: true, color: "success", msg: "Task Added!" }); // alert
      setModalOpen(false);
      await addTask(title, desc, dueDate, createdAt);
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setDesc("");
      setDueDate(null);
      setTimeout(() => {
        // Set snackbar to false after 1.5s
        setSnackbarState({ open: false, color: "", msg: "" });
      }, 1500);
    }
  };

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <motion.form
            {...opacityAnimation}
            onSubmit={handleAddTask}
            className='todo_form flex_col_between'
          >
            <motion.h4 className='modal_heading'>Create task</motion.h4>
            <span className='form_item'>
              <label htmlFor='title'>Title</label>
              <input
                id='title'
                type='text'
                placeholder='Enter task title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </span>

            <span className='form_item'>
              <label htmlFor='desc'>Description</label>
              <textarea
                id='desc'
                className='desc'
                rows='4'
                cols='30'
                placeholder='Enter task description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </span>

            <span className='form_item'>
              <h6 className='due_date'>Due Date: {dueDate}</h6>
            </span>

            <PrimaryBtn text='Submit' />
          </motion.form>
        </ModalDialog>
      </Modal>

      {/* triggers the modal */}
      <SecondaryBtn
        text='Create Task'
        onClick={() => setModalOpen(!modalOpen)}
        icon={<img src={plus_icon} className='icon' />}
      />
      <SnackbarComponent snackbarState={snackbarState} />
    </>
  );
}

export default CreateTask;
