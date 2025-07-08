import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ai-form-validator.firebaseapp.com",
  projectId: "ai-form-validator",
  storageBucket: "ai-form-validator.firebasestorage.app",
  messagingSenderId:  "188650890581",
  appId: "1:188650890581:web:b3fdba221e50780935bbdc"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
