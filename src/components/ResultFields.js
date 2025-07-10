import React from "react";
import "../styles/ResultFields.css";


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

      <label>
        <div className="result-field">
        Location:
        <input
        type="text"
        value={data.location || ""}
        onChange={(e) => onChange("location", e.target.value)}
        style={{ marginTop: "10px" }}
  /> 
       </div>
     </label> 

       <label>
       <div className="result-field" > 
       Priority:
       <select 
       value={data.priority || ""}
       onChange={(e) => onChange("priority", e.target.value)}
       style={{ marginTop: "10px" }}
       
  >
        <option value="">-- Select --</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
       </select>
       </div>
      </label>

      <label>
       <div className="result-field">
       Category:
       <input
         type="text"
         value={data.category || ""}
          onChange={(e) => onChange("category", e.target.value)} 
          style={{ marginTop: "10px" }}
  />
         </div>
     </label>

    </div>
  );
}

export default ResultFields;
