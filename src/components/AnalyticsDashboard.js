import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "results"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setTasks(data);
    });
    return () => unsubscribe();
  }, []);

  const totalTasks = tasks.length;

  const subjectCounts = tasks.reduce((acc, item) => {
    const subject = item.subject || "Unknown";
    acc[subject] = (acc[subject] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(subjectCounts),
    datasets: [
      {
        label: "Subject Frequency",
        data: Object.values(subjectCounts),
        backgroundColor: "#3498db",
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📊 Usage Analytics</h2>
      <p>Total Tasks Extracted: <strong>{totalTasks}</strong></p>
      <div style={{ maxWidth: "600px", marginTop: "20px" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
