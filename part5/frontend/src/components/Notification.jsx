import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AlertTitle from "@mui/material/AlertTitle";
export default function Notification({ message, status }) {
  let icon = null;
  if (status === "success") {
    icon = <CheckIcon fontSize="inherit" />;
  } else if (status === "error") {
    icon = <ErrorOutlineOutlinedIcon fontSize="inherit" />;
  } else if (status === "info") {
    icon = <InfoOutlinedIcon fontSize="inherit" />;
  } else if (status === "warning") {
    icon = <WarningAmberOutlinedIcon fontSize="inherit" />;
  }
  if (message === null) {
    return null;
  } else {
    return (
      <Alert icon={icon} severity={status}>
        <AlertTitle>{status}</AlertTitle>
        {message}
      </Alert>
    );
  }
}
