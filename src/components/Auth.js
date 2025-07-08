import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "./Auth.css";

const Auth = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in. Check console for details.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome to Your AI Form Validator</h2>
      <p>Please sign in to continue</p>
      <button className="google-btn" onClick={handleLogin}>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google icon"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
