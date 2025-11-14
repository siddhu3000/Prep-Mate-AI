import React, { useEffect, useState } from "react";
import FeedbackAccordion from "../components/FeedbackAccordion";
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../scss/pages/feedbackpage.module.scss';

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain, difficulty, questions, answers } = location.state || {};
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!questions || !answers) {
      navigate("/");
      return;
    }

    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/feedback/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ questions, answers }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to get feedback");
        }

        setFeedback(data.feedback || []);
        
        // Save session with properly formatted feedback
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sessions/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            domain, 
            difficulty,
            questions, 
            answers, 
            feedback: data.feedback.map(f => JSON.stringify(f))
          }),
        }).then(async (saveResponse) => {
          if (!saveResponse.ok) {
            const saveError = await saveResponse.json();
            throw new Error(saveError.error || "Failed to save session");
          }
        });
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [domain, difficulty, questions, answers, navigate]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>
            Analyzing Your Responses...
          </div>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            {error}
          </div>
          <button
            onClick={() => navigate("/")}
            className={`${styles.button} ${styles.primary}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <FeedbackAccordion questions={questions} feedback={feedback} />
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => navigate("/history")} 
          className={`${styles.button} ${styles.secondary}`}
        >
          View History
        </button>
        <button 
          onClick={() => navigate("/")} 
          className={`${styles.button} ${styles.primary}`}
        >
          New Interview
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage; 