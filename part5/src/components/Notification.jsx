export default function Notification ({ message, status }) {
    if (message == null) {
      return null;
    } else {
      return <div className={status}>{message}</div>;
    }
  };