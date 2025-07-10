import React from "react";
import SaveButton from "./SaveButton";

const ResultActions = ({ data, onClear, user }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button onClick={onClear}>Clear</button>
      <SaveButton data={data} user={user} />
    </div>
  );
};

export default ResultActions;
