import React, { useState, useEffect } from "react";
import "./App.css";
import NaturalLanguageInput from "./components/NaturalLanguageInput";
import ResultFields from "./components/ResultFields";
import SavedResults from "./components/SavedResults";
import LoadingSpinner from "./components/LoadingSpinner";
import VoiceInput from "./components/VoiceInput";
import ResultActions from "./components/ResultActions";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
} from "./utils/localStorageUtils";
import { fetchStructuredData } from "./api/cohereService";
import ErrorDisplay from "./components/ErrorDisplay";

function App() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // To load saved data from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setFormData(saved);
    }
  }, []);

  // To save to localStorage on change
  useEffect(() => {
    if (formData) {
      saveToLocalStorage(formData);
    }
  }, [formData]);

  //  To handle input (text or voice)
  const handleInputSubmit = async (userInput) => {
    setError("");

    if (!userInput || userInput.trim() === "") {
      setError("Please enter a sentence to analyze.");
      return;
    }

    setLoading(true);

    try {
      const parsedData = await fetchStructuredData(userInput);
      setFormData(parsedData);
    } catch (err) {
      console.error("Error from Cohere:", err);
      setError("Could not process your input. Please try again.");
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

  const handleClear = () => {
    setFormData(null);
    clearLocalStorage();
  };

  return (
    <div className="container">
      <h1>AI Form Validator</h1>

      <ErrorDisplay message={error} />

      <NaturalLanguageInput onSubmit={handleInputSubmit} />
      <VoiceInput onVoiceSubmit={handleInputSubmit} />
      {loading && <LoadingSpinner />}

      {formData && !loading && (
        <>
          <ResultFields data={formData} onChange={handleFieldChange} />
          <ResultActions data={formData} onClear={handleClear} />
        </>
      )}

      <SavedResults />
    </div>
  );
}

export default App;
