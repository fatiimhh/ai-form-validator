import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const SavedResults = () => {
  const [savedItems, setSavedItems] = useState([]);

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

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Saved Results</h2>
      {savedItems.length === 0 ? (
        <p>No saved results yet.</p>
      ) : (
        <ul className="saved-results-list">
          {savedItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "15px", position: "relative" }}>
              <strong>Subject:</strong> {item.subject || "N/A"} <br />
              <strong>Date:</strong> {item.date || "N/A"} <br />
              <strong>Time:</strong> {item.time || "N/A"}

                 <button className="delete-btn"
                onClick={() => handleDelete(item.id)}
                   >
                    Delete
                      </button>


              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedResults;
