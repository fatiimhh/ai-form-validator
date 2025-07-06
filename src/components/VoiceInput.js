import React, { useState } from "react";

const VoiceInput = ({ onVoiceSubmit }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setError(null);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceSubmit(transcript); // send it to submit handler
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={handleStart} className="voice-button">
         {isListening ? "Listening..." : "Speak"} 🎤
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VoiceInput;
