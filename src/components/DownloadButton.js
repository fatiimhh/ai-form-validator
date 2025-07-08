import React from "react";
import jsPDF from "jspdf";

const DownloadButton = ({ data }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("AI Form Result", 20, 20);

    doc.setFontSize(12);
    doc.text(`Subject: ${data.subject || "N/A"}`, 20, 40);
    doc.text(`Date: ${data.date || "N/A"}`, 20, 50);
    doc.text(`Time: ${data.time || "N/A"}`, 20, 60);

    doc.save("form_result.pdf");
  };

  {/* const handleDownloadTXT = () => {
    const txt = `Subject: ${data.subject || "N/A"}\nDate: ${data.date || "N/A"}\nTime: ${data.time || "N/A"}`;
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form_result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; */}

  const handleDownloadCSV = () => {
    const csvHeader = "Subject,Date,Time\n";
    const csvRow = `${data.subject || ""},${data.date || ""},${data.time || ""}\n`;
    const blob = new Blob([csvHeader + csvRow], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form_result.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="download-buttons" style={{ marginTop: "8px", display: "flex", gap: "10px" }}> 
      <button onClick={handleDownloadPDF}>Download PDF</button>
      {/* <button onClick={handleDownloadTXT}>Download TXT</button> */}
      <button onClick={handleDownloadCSV}>Download CSV</button>
    </div>
  );
};

export default DownloadButton;
