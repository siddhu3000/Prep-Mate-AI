import React, { useState } from "react";
import styles from '../scss/components/QuestionForm.module.scss';

const QuestionForm = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleChange = (i, val) => {
    const newAnswers = [...answers];
    newAnswers[i] = val;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.progressSection}>
        <div className={styles.progressText}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.questionCard}>
          <div className={styles.questionText}>
            <strong>Q{currentQuestion + 1}:</strong> {questions[currentQuestion]}
          </div>
          <textarea
            value={answers[currentQuestion]}
            onChange={(e) => handleChange(currentQuestion, e.target.value)}
            className={styles.answerArea}
            required
            rows={8}
            placeholder="Type your answer here..."
          />
        </div>

        <div className={styles.buttonContainer}>
          <button 
            type="button" 
            className={styles.prevButton}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button 
            type="submit" 
            className={`${styles.nextButton} ${
              currentQuestion === questions.length - 1 ? styles.submitButton : ''
            }`}
          >
            {currentQuestion === questions.length - 1 ? "Submit All Answers" : "Next Question"}
          </button>
        </div>
      </form>

      <div className={styles.questionDots}>
        {questions.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentQuestion(idx)}
            className={`${styles.dot} ${idx === currentQuestion ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionForm; 