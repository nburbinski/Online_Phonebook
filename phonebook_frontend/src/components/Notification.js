import React from "react";

const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null;
  }
  setTimeout(() => {
    setMessage(null);
  }, 4000);

  if (message.includes("Added")) {
    return (
      <>
        <p className="alert alert-success mb-3">{message}</p>
      </>
    );
  } else {
    return (
      <div className="container">
        <p className="alert alert-danger">{message}</p>
      </div>
    );
  }
};
export default Notification;
