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
import UserDropdown from "./components/UserDropdown";

function App() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Track signed-in user

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setFormData(saved);
    }
  }, []);

  // Save to localStorage when formData changes
  useEffect(() => {
    if (formData) {
      saveToLocalStorage(formData);
    }
  }, [formData]);

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
    <div>
      {user && (
        <div className="user-dropdown-container">
          <UserDropdown user={user} setUser={setUser} />
        </div>
      )}

      <div className="container">
        {!user ? (
          <Auth setUser={setUser} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
