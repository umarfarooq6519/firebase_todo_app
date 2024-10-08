import { Snackbar } from "@mui/joy";

const SnackbarComponent = ({ snackbarState, setSnackbar }) => {
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={1500}
      color={snackbarState.color ? snackbarState.color : "neutral"}
      variant='soft'
      sx={{
        minWidth: "fit-content",
        border: "1px solid currentColor",
        padding: "10px 20px",
      }}
    >
      {snackbarState.msg}
    </Snackbar>
  );
};

export default SnackbarComponent;
