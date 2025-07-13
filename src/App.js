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
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ProjectInfoModal from "./components/ProjectInfoModal";

function App() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) setFormData(saved);
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (formData) saveToLocalStorage(formData);
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
    <div className={darkMode ? "dark-mode" : ""}>
      {user && (
        <div className="user-dropdown-container">
          <UserDropdown user={user} setUser={setUser} />
        </div>
      )}

      <div className={`container ${darkMode ? "dark" : ""}`}>
        {!user ? (
          <Auth setUser={setUser} />
        ) : (
          <>
            <h1>Welcome, {user.displayName}</h1>
            <ErrorDisplay message={error} />

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode 🌞 " : "Dark Mode 🌙 "}
              </button>
              <button onClick={() => setShowModal(true)}>Project Info ℹ️</button>
              <button onClick={() => setShowAnalytics(!showAnalytics)}>
                {showAnalytics ? "Back to Saved Results" : "View Analytics 📊"}
              </button>
            </div>

            <NaturalLanguageInput onSubmit={handleInputSubmit} />
            <VoiceInput
              onVoiceSubmit={handleInputSubmit}
              onClear={handleClear}
              onSave={() => document.querySelector(".save-button")?.click()}
              onNavigate={() =>
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
              }
            />

            {loading && <LoadingSpinner />}

            {formData && !loading && (
              <>
                <ResultFields data={formData} onChange={handleFieldChange} />
                <ResultActions data={formData} onClear={handleClear} />
              </>
            )}

            {showAnalytics ? (
              <AnalyticsDashboard />
            ) : (
              <SavedResults user={user} />
            )}

            <ProjectInfoModal isOpen={showModal} onClose={() => setShowModal(false)} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
