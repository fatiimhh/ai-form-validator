import React from "react";
import "../App.css"; 

const ErrorDisplay = ({ message }) => {
  if (!message) return null;

  return <div className="error-box">{message}</div>;
};

export default ErrorDisplay;
