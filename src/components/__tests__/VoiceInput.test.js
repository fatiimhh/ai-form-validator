import { render, screen, fireEvent } from "@testing-library/react";
import VoiceInput from "../VoiceInput";


jest.mock("react-speech-recognition", () => {
  return {
    useSpeechRecognition: () => ({
      transcript: "Schedule meeting at 3pm",
      listening: false,
      resetTranscript: jest.fn(),
      browserSupportsSpeechRecognition: true,
    }),
    default: {
      startListening: jest.fn(),
    },
  };
}); 

describe("VoiceInput", () => {
  it("renders Start Voice Input button", () => {
    render(<VoiceInput onVoiceSubmit={jest.fn()} />);
    expect(screen.getByText("Start Speaking🎤")).toBeInTheDocument();
  });

  it("displays transcript when available", () => {
    render(<VoiceInput onVoiceSubmit={jest.fn()} />);
    expect(screen.getByText(/you said/i)).toBeInTheDocument();
    expect(screen.getByText(/schedule meeting at 3pm/i)).toBeInTheDocument();
  });
});
