import { useEffect, useState } from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";
import parseFormatDate from "../utils/dateUtils";

import { useDBcontext } from "../contexts/DBContext";

import plus_icon from "/plus_icon.svg";

function NewTask({ setSnackbar }) {
  //importing DBcontext variables
  const { addTask } = useDBcontext();

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
      setSnackbar({ open: true, color: "success", msg: "Task Added!" }); // alert
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
        setSnackbar({ open: false, color: "", msg: "" });
      }, 1500);
    }
  };

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <form onSubmit={handleAddTask} className='todo_form flex_col_between'>
            <h4 className='modal_heading'>Create task</h4>
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

            <button
              type='submit'
              className='fancy_button new_task_btn flex_center'
            >
              <h5 className='heading'>Create</h5>
            </button>
          </form>
        </ModalDialog>
      </Modal>

      {/* triggers the modal */}
      <button
        type='button'
        onClick={() => setModalOpen(!modalOpen)}
        className='fancy_button new_task_btn'
      >
        <img src={plus_icon} className='icon' />
        <h5 className='heading'>Create task</h5>
      </button>
    </>
  );
}

export default NewTask;
