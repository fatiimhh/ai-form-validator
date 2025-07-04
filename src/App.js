import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import NaturalLanguageInput from "./components/NaturalLanguageInput";
import ResultFields from "./components/ResultFields";
import SaveButton from "./components/SaveButton";
import SavedResults from "./components/SavedResults";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false); // loading state

  const handleInputSubmit = async (userInput) => {
    console.log("User typed:", userInput);
    setLoading(true); 
    const prompt = `
You are a helpful assistant that extracts structured data from user input.
Given this sentence: "${userInput}"
Return a JSON object with the following fields:
- subject (what the task or event is),
- date (e.g., June 20, next Thursday, tomorrow),
- time (e.g., 4PM, 18:00).
If any field is missing, return it as null.
`;

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/generate",
        {
          model: "command",
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.3,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_COHERE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const rawOutput = response.data.generations[0].text.trim();
      const jsonStart = rawOutput.indexOf("{");
      const jsonEnd = rawOutput.lastIndexOf("}") + 1;
      const cleanJson = rawOutput.substring(jsonStart, jsonEnd);

      const parsedData = JSON.parse(cleanJson);
      setFormData(parsedData);
    } catch (error) {
      console.error("Error from Cohere:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="container">
      <h1>AI Form Validator</h1>
      <NaturalLanguageInput onSubmit={handleInputSubmit} />

      {loading && <LoadingSpinner />} 

      {formData && !loading && (
        <>
          <ResultFields data={formData} onChange={handleFieldChange} />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => setFormData(null)}>Clear</button>
            <SaveButton data={formData} />
          </div>
        </>
      )}

      <SavedResults />
    </div>
  );
}

export default App;
