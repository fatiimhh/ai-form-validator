# AI Form Validator

An intelligent React web application that extracts structured tasks (subject, date, time, location, etc.) from natural language input using AI (Cohere API). It also includes voice input, Firebase authentication, real-time saving, search, analytics, and more.


🚀 Features

🔐 Google Sign-In with Firebase Authentication

📄 Natural Language Input → Structured Data Extraction (Cohere API)

🔊 Voice input and commands (save, clear, show saved results)

💾 Save tasks to Firebase Firestore

🔍 Real-time search, update, and delete saved results

📂 Download results as pdf and CSV files

📈 Analytics dashboard (usage stats, most common subjects, etc.)

🔔 Browser notifications

🎙️ Voice command control for saving, clearing, and navigating


🛠️ Tech Stack

React.js

Firebase (Auth + Firestore)

Cohere API for AI task parsing

react-speech-recognition for voice input

Chart.js for analytics graphs


🧠 How It Works

Users sign in with Google.

They can enter a sentence like "Meeting with Sarah tomorrow at 2pm."

The AI extracts:

Subject: Meeting with Sarah

Date: Tomorrow

Time: 2 PM

Users can save, update, or delete tasks and view analytics.

🔗 Live Demo
https://fatiimhh.github.io/ai-form-validator/




## 📄 License

This project is licensed under the [MIT License](LICENSE).
