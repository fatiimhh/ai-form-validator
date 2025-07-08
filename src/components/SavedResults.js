import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import DownloadButton from "./DownloadButton";

const SavedResults = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "results"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        
      }));
      setSavedItems(data);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "results", id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Filter savedItems based on search term 
  const filteredItems = savedItems.filter((item) => {
  const term = searchTerm.toLowerCase();

  const subject = item.subject ? item.subject.toLowerCase() : "";
  const date = item.date ? item.date.toString().toLowerCase() : "";
  const time = item.time ? item.time.toString().toLowerCase() : "";

  return subject.includes(term) || date.includes(term) || time.includes(term);
});

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Saved Results</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by subject, date, or time"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "15px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {filteredItems.length === 0 ? (
        <p>No saved results found.</p>
      ) : (
        <ul className="saved-results-list">
          {filteredItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "15px", position: "relative" }}>
              <strong>Subject:</strong> {item.subject || "N/A"} <br />
              <strong>Date:</strong> {item.date || "N/A"} <br />
              <strong>Time:</strong> {item.time || "N/A"}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                <DownloadButton data={item} />
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedResults;
