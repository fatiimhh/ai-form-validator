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


function App() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setFormData(saved);
    }
  }, []);

  useEffect(() => {
    if (formData) {
      saveToLocalStorage(formData);
    }
  }, [formData]);

  const handleInputSubmit = async (userInput) => {
    console.log("User typed:", userInput);
    setLoading(true);

    try {
      const parsedData = await fetchStructuredData(userInput);
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

  const handleClear = () => {
    setFormData(null);
    clearLocalStorage();
  };

  return (
    <div className="container">
      <h1>AI Form Validator</h1>
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
