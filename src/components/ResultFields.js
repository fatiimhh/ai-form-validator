import React from "react";

const ResultFields = ({ data }) => {
  return (
    <div className="result-box">
    <h2 style={{ marginBottom: "10px", fontWeight: "600" }}>Result</h2>
    <div>Subject: {data.subject}</div>
    <div>Date: {data.date}</div>
    <div>Time: {data.time}</div>
  </div>
  );
};

export default ResultFields;
