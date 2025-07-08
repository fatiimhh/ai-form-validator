import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
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
  const [user, setUser] = useState(null); // to track signed-in user

  // Load from local storage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setFormData(saved);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (formData) {
      saveToLocalStorage(formData);
    }
  }, [formData]);

  // Handle user input (text or voice)
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

  // show Auth component if user not signed in
  if (!user) {
    return (
      <div className="container">
        <h1>AI Form Validator</h1>
        <Auth setUser={setUser} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {user.displayName}</h1>

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

      <SavedResults user={user} />
    </div>
  );
}

export default App;
