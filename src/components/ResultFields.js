import React from "react";

const ResultFields = ({ data }) => {
  return (
    <div className="result-box">
    <h2 style={{ marginBottom: "10px", fontWeight: "600" }}>Parsed Result</h2>
    <div>Guests: {data.guests}</div>
    <div>Date: {data.date}</div>
    <div>Time: {data.time}</div>
  </div>
  );
};

export default ResultFields;
