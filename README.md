# 🌟 AI Form Validator
An intelligent React web app that extracts structured tasks (like subject, date, time, location) from natural language using Cohere AI. Includes voice commands, Firebase authentication, task saving, real-time updates, analytics, and more!

----------------------------------------------------------------------

🚀 Features

🔐 Google Sign-In (Firebase Authentication)

📄 Natural Language Input → Structured Task Extraction (via Cohere API)

🎙️ Voice Input with commands (e.g., “save”, “clear”, “show saved results”)

💾 Save Tasks to Firestore

🔍 Real-Time Search, Update & Delete of saved tasks

📂 Download as PDF or CSV

📈 Analytics Dashboard (e.g. usage stats, most common subjects)

🔔 Browser Notifications

🌙 Dark Mode Toggle

🧪 Unit Tests using Jest + React Testing Library

💬 Project Info Modal

-----------------------------------------------------------------------

🛠️ Tech Stack
React.js

Firebase (Authentication + Firestore)

Cohere API (Natural language understanding)

React Speech Recognition

Chart.js (Data visualization)

Jest + React Testing Library (Unit testing)

-------------------------------------------------------------------

🧠 How It Works
User signs in via Google.

Enters a sentence like:
"Meeting with Sarah tomorrow at 2 PM."

The AI extracts structured info like:

Subject: Meeting with Sarah

Date: Tomorrow

Time: 2 PM

User can:

Save the result

Edit or delete it

Search or export it

View analytics on their usage

------------------------------------------------------------------

🧪 Testing
Includes unit tests for components like:

ResultFields

VoiceInput (e.g. voice command handling)

SavedResults (edit & delete behavior)

To run tests:
npm test


# 🌐 Live Demo

🔗  https://fatiimhh.github.io/ai-form-validator/ 



# 📄 License
This project is licensed under the MIT License.