import React, { useState } from "react";
import "./App.css";
import NaturalLanguageInput from "./components/NaturalLanguageInput";
import ResultFields from "./components/ResultFields";

function App() {
  const [formData, setFormData] = useState(null);

  const handleInputSubmit = (userInput) => {
    console.log("User typed:", userInput);

    // Dummy parsed data
    const dummyData = {
      guests: 2,
      date: "2025-07-01",
      time: "20:00",
    };

    setFormData(dummyData);
  };

  return (
     
  <div className="container">
    <h1>AI Form Validator</h1>
    <NaturalLanguageInput onSubmit={handleInputSubmit} />
    {formData && <ResultFields data={formData} />}
  </div>
  );
}

export default App;
