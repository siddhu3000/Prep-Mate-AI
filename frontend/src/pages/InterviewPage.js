import React from "react";
import QuestionForm from "../components/QuestionForm";
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../scss/pages/interviewpage.module.scss';

const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain, difficulty, questions } = location.state || {};

  if (!domain || !questions) {
    navigate("/interview");
    return null;
  }

  const handleSubmit = (answers) => {
    navigate("/feedback", { 
      state: { domain, difficulty, questions, answers },
      replace: true
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.domainTitle}>{domain}</h2>
        <div className={styles.difficultyBadge}>
          {difficulty}
        </div>
      </div>
      <div className={styles.content}>
        <QuestionForm questions={questions} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InterviewPage; 