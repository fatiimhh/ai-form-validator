import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const SaveButton = ({ data }) => {
  const handleSave = async () => {
    try {
        if (!data) {
  alert("No data to save!"); // to avoid saving empty or null values
  return;
}

      await addDoc(collection(db, "results"), data);
      alert("Saved to Firebase!");
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <button className="save-button" onClick={handleSave}>
      Save
    </button>
  );
};

export default SaveButton;
