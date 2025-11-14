import React from "react";

const FeedbackDisplay = ({ feedback }) => (
  <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
    <h2>AI Feedback</h2>
    <ol style={{ textAlign: "left" }}>
      {feedback.map((f, i) => (
        <li key={i} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
          {f}
        </li>
      ))}
    </ol>
  </div>
);

export default FeedbackDisplay; 