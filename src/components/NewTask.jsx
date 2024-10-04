import plus_icon from "/plus_icon.svg"; 

function NewTask() {
  return (
    <button type="submit" className='fancy_button new_task_btn flex_center'>
      <img src={plus_icon} className='icon' />
      <h5 className="heading">Create task</h5>
    </button>
  );
}

export default NewTask;
