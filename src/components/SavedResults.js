import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import DownloadButton from "./DownloadButton";

const SavedResults = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedData, setEditedData] = useState({ subject: "", date: "", time: "" });

  // Real-time listener
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

  // Delete a result
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "results", id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Start editing
  const startEditing = (item) => {
  setEditingItemId(item.id);
  setEditedData({
    subject: item.subject || "",
    date: item.date || "",
    time: item.time || "",
    location: item.location || "",
    priority: item.priority || "",
    category: item.category || "",
  });
};


  // Handle field changes in edit mode
  const handleEditChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Save the edits
  const saveEdits = async (id) => {
    try {
      const { subject, date, time } = editedData;
      if (!subject || !date || !time) {
        alert("All fields are required.");
        return;
      }

      await updateDoc(doc(db, "results", id), editedData);
      setEditingItemId(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Filter results based on search
  const filteredItems = savedItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      (item.subject || "").toLowerCase().includes(term) ||
      (item.date || "").toLowerCase().includes(term) ||
      (item.time || "").toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Saved Results</h2>

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
            <li key={item.id} style={{ marginBottom: "20px" }}>
              {editingItemId === item.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <input
                    type="text"
                    value={editedData.subject}
                    onChange={(e) => handleEditChange("subject", e.target.value)}
                    placeholder="Subject"
                  />
                  <input
                    type="text"
                    value={editedData.date}
                    onChange={(e) => handleEditChange("date", e.target.value)}
                    placeholder="Date"
                  />
                  <input
                    type="text"
                    value={editedData.time}
                    onChange={(e) => handleEditChange("time", e.target.value)}
                    placeholder="Time"
                  />

                  <input
                    type="text"
                    value={editedData.location}
                    onChange={(e) => handleEditChange("location", e.target.value)}
                    placeholder="location"
                  />

                  <input
                    type="text"
                    value={editedData.priority}
                    onChange={(e) => handleEditChange("priority", e.target.value)}
                    placeholder="priority"
                  />

                  <input
                    type="text"
                    value={editedData.category}
                    onChange={(e) => handleEditChange("category", e.target.value)}
                    placeholder="category"
                  />










                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button onClick={() => saveEdits(item.id)}>Save</button>
                    <button onClick={() => setEditingItemId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <strong>Subject:</strong> {item.subject || "N/A"} <br />
                  <strong>Date:</strong> {item.date || "N/A"} <br />
                  <strong>Time:</strong> {item.time || "N/A"} <br />
                  <strong>Location:</strong> {item.location || "N/A"} <br />
                  <strong>Priority:</strong> {item.priority || "N/A"} <br />
                  <strong>Category:</strong> {item.category || "N/A"} <br />
                  <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => startEditing(item)} style={{ marginTop: "10px", display: "flex", gap: "10px" }}>Edit</button>
                    <DownloadButton data={item} />
                  </div>
                </>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedResults;
