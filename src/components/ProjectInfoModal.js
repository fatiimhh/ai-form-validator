import React from "react";




const ProjectInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>About This Project</h2>
        <p>
          <strong>Project Name:</strong> AI Form Validator 🧠
        </p>
        <p>
          <strong>Description:</strong> This app lets users input natural language or voice commands to extract task information like subject, date, time, priority, location, and more.
        </p>
        <p>
          <strong>Main Features:</strong><br />
          • Natural language processing (Cohere API)<br />
          • Voice input (Speech Recognition)<br />
          • Firestore database CRUD (create, edit, delete)<br />
          • Reminders and analytics<br />
          • Responsive and mobile friendly UI<br />
        </p>
        <p>
          <strong>Tools Used:</strong> React, Firebase, Cohere API, Testing Library, Jest, GitHub Actions
        </p>
        <p>
          <strong>My Thought Process:</strong><br />
          I wanted to build an intelligent form assistant that feels more human-like. I designed it modularly and kept expanding it with features like voice commands, analytics, and notifications to reflect real-world product iteration.
        </p>
        <p>
          <strong>GitHub:</strong> <a href="https://github.com/fatiimhh/ai-form-validator" target="_blank" rel="noopener noreferrer">https://github.com/fatiimhh/ai-form-validator</a>
        </p>
      </div>
    </div>
  );
};

export default ProjectInfoModal;
