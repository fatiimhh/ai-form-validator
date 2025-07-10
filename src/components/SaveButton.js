import React from "react"; 
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const SaveButton = ({ data }) => {
  const handleSave = async () => {
    if (!data || !data.subject || !data.date || !data.time) {
      alert("Incomplete data. Please fill in subject, date, and time.");
      return;
    }

    try {
      await addDoc(collection(db, "results"), {
        subject: data.subject,
        date: data.date,
        time: data.time,
        location: data.location || "",   // optional fields
        priority: data.priority || "",
        category: data.category || "",
      });
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
