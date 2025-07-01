import React, { useState } from "react";

const NaturalLanguageInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput(""); // clear field
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='e.g. "Dinner for 2 next Friday at 8pm"'
        className="border p-2 w-3/4 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default NaturalLanguageInput;
