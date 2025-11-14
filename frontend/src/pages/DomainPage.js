import React, { useState } from "react";
import DomainSelect from "../components/DomainSelect";
import { useNavigate } from "react-router-dom";
import styles from '../scss/pages/domainpage.module.scss';

const DomainPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = async ({ domain, difficulty }) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Sending request with:", { domain, difficulty });
      
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/questions/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ domain, difficulty }),
      });

      const data = await response.json();
      console.log("Received response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate questions");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions were generated. Please try again.");
      }

      // Navigate with the questions data to the new route
      navigate("/interview/questions", {
        state: { 
          domain, 
          difficulty,
          questions: data.questions 
        },
        replace: true,
      });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Select Your Interview Domain</h1>
          <p className={styles.subtitle}>
            Choose a technical domain and difficulty level to start your mock interview
          </p>
        </div>
        
        {error && (
          <div className={styles.errorContainer}>
            {error}
          </div>
        )}
        
        <DomainSelect onSelect={handleSelect} loading={loading} />
      </div>
    </div>
  );
};

export default DomainPage; 