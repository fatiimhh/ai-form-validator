import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceInput = ({ onVoiceSubmit, onClear, onSave, onNavigate }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleVoiceCommand = () => {
    const lower = transcript.toLowerCase();

    if (lower.includes("clear")) {
      onClear?.(); //  Call clear handler
    } else if (lower.includes("save")) {
      onSave?.(); // Call save handler
    } else if (lower.includes("show") && lower.includes("saved")) {
      onNavigate?.(); // Call navigation handler
    } else {
      onVoiceSubmit(lower); //Sends input for parsing
    }

    resetTranscript();
  };

  return (
    <div>
      <button onClick={() => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: false });
      }}>
        🎤 Start Voice Input
      </button>
      {listening && <p>Listening...</p>}
      {transcript && (
        <>
          <p><strong>You said:</strong> {transcript}</p>
          <button onClick={handleVoiceCommand}>Submit</button>
        </>
      )}
    </div>
  );
};

export default VoiceInput;
