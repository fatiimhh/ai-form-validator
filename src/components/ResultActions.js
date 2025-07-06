import React from "react";
import SaveButton from "./SaveButton";

const ResultActions = ({ data, onClear }) => (
  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
    <button onClick={onClear}>Clear</button>
    <SaveButton data={data} />
  </div>
);

export default ResultActions;
