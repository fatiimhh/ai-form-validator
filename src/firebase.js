// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ai-form-validator.firebaseapp.com",
  projectId: "ai-form-validator",
  storageBucket: "ai-form-validator.firebasestorage.app",
  messagingSenderId: "188650890581",
  appId: "1:188650890581:web:b3fdba221e50780935bbdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
