import React from "react";
import "./ResultFields.css";


function ResultFields({ data, onChange }) {
  return (
    <div className="result-container">
      <h2 className="result-title">Result</h2>

      <div className="result-field">
        <label>Subject:</label>
        <input
          type="text"
          value={data.subject || ""}
          onChange={(e) => onChange("subject", e.target.value)}
        />
      </div>

      <div className="result-field">
        <label>Date:</label>
        <input
          type="text"
          value={data.date || ""}
          onChange={(e) => onChange("date", e.target.value)}
        />
      </div>

      <div className="result-field">
        <label>Time:</label>
        <input
          type="text"
          value={data.time || ""}
          onChange={(e) => onChange("time", e.target.value)}
        />
      </div>
    </div>
  );
}

export default ResultFields;
