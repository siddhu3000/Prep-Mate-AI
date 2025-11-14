import React, { useState } from "react";
import styles from '../scss/components/feedbackaccordion.module.scss';

const FeedbackSection = ({ title, content, isCorrectAnswer = false, icon = null, isCode = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle null/undefined content
  if (!content) {
    return null;
  }

    return (
    <div className={`${styles.feedbackSection} ${isCorrectAnswer ? styles.correctAnswer : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.sectionHeader}
      >
        <div className={styles.headerContent}>
          {icon && (
            <span className={`material-icons-outlined ${styles.icon}`}>
              {icon}
            </span>
          )}
          {title}
        </div>
        <span className={`material-icons-outlined ${styles.arrow} ${isOpen ? styles.open : ''}`}>
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className={`${styles.sectionContent} ${isCode ? styles.code : ''}`}>
          {Array.isArray(content) ? (
            <ul className={styles.bulletList}>
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            content
          )}
        </div>
      )}
    </div>
  );
};

const QuestionFeedback = ({ question, feedback, isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState('main');

  if (!feedback) {
    return null;
  }

  const isCorrect = feedback.correct === true;
  const score = feedback.score || 0;
  const difficulty = feedback.difficulty || "Unknown";

  const TabButton = ({ id, label, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className={`${styles.questionItem} ${isCorrect ? styles.correct : styles.incorrect}`}>
      <button
        onClick={onToggle}
        className={`${styles.questionHeader} ${isCorrect ? styles.correct : styles.incorrect} ${isOpen ? styles.open : ''}`}
      >
        <div>
          <div className={styles.headerContent}>
            <span className={`material-icons-outlined ${styles.icon}`}>
              {isCorrect ? 'check_circle' : 'cancel'}
            </span>
            <span>Question {question}</span>
          </div>
          <div className={styles.scoreInfo}>
            Score: {score}/10 • Difficulty: {difficulty}
          </div>
        </div>
        <span className={`material-icons-outlined ${styles.arrow} ${isOpen ? styles.open : ''}`}>
          expand_more
        </span>
      </button>
      
      {isOpen && (
        <div className={styles.questionContent}>
          <div className={styles.tabContainer}>
            <TabButton 
              id="main" 
              label="Main Feedback" 
              isActive={activeTab === 'main'} 
            />
            <TabButton 
              id="additional" 
              label="Additional Resources" 
              isActive={activeTab === 'additional'} 
            />
          </div>

          {activeTab === 'main' && (
            <>
              <FeedbackSection 
                title="Your Answer" 
                content={feedback.answerProvided}
                icon="edit_note"
              />
              <FeedbackSection 
                title="Technical Accuracy" 
                content={feedback.technicalAccuracy}
                icon="gps_fixed"
              />
              <FeedbackSection 
                title="Completeness" 
                content={feedback.completeness}
                icon="done_all"
              />
              <FeedbackSection 
                title="Areas of Improvement" 
                content={feedback.areasOfImprovement}
                icon="trending_up"
              />
              <FeedbackSection 
                title="Suggestions" 
                content={feedback.suggestions}
                icon="lightbulb"
              />
              {!isCorrect && feedback.correctAnswer && (
                <FeedbackSection 
                  title="Correct Answer" 
                  content={feedback.correctAnswer}
                  isCorrectAnswer={true}
                  icon="auto_awesome"
                />
              )}
              {feedback.codeQuality && (
                <FeedbackSection 
                  title="Code Quality Analysis" 
                  content={feedback.codeQuality}
                  icon="code"
                  isCode={true}
                />
              )}
            </>
          )}

          {activeTab === 'additional' && (
            <>
              <FeedbackSection 
                title="Key Concepts" 
                content={feedback.keyPoints}
                icon="key"
              />
              <FeedbackSection 
                title="Common Misconceptions" 
                content={feedback.commonMisconceptions}
                icon="warning"
              />
              <FeedbackSection 
                title="Best Practices" 
                content={feedback.bestPractices}
                icon="thumb_up"
              />
              {feedback.timeComplexity && (
                <FeedbackSection 
                  title="Time Complexity" 
                  content={feedback.timeComplexity}
                  icon="timer"
                />
              )}
              {feedback.spaceComplexity && (
                <FeedbackSection 
                  title="Space Complexity" 
                  content={feedback.spaceComplexity}
                  icon="analytics"
                />
              )}
              <FeedbackSection 
                title="Real-World Applications" 
                content={feedback.realWorldApplications}
                icon="public"
              />
              <FeedbackSection 
                title="Further Reading" 
                content={feedback.furtherReading}
                icon="menu_book"
              />
              <FeedbackSection 
                title="Related Topics" 
                content={feedback.relatedTopics}
                icon="link"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const FeedbackAccordion = ({ questions, feedback }) => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  // Add null checks for feedback array
  if (!Array.isArray(feedback) || feedback.length === 0) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px",
        color: "#666"
      }}>
        No feedback available for this session.
      </div>
    );
  }

  // Calculate overall performance with null checks
  const correctAnswers = feedback.filter(f => f && f.correct === true).length;
  const totalQuestions = questions.length;
  const performancePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const averageScore = feedback.reduce((acc, f) => acc + (f && f.score ? f.score : 0), 0) / totalQuestions;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Interview Performance</h2>

      <div className={styles.performanceSummary}>
        <div className={styles.performanceItem}>
          <div className={`${styles.performanceValue} ${
            performancePercentage >= 70 ? styles.good :
            performancePercentage >= 40 ? styles.medium :
            styles.poor
          }`}>
            {performancePercentage.toFixed(0)}%
          </div>
          <div className={styles.performanceLabel}>
            Correct Answers
          </div>
        </div>

        <div className={styles.performanceItem}>
          <div className={`${styles.performanceValue} ${styles.score}`}>
            {averageScore.toFixed(1)}/10
          </div>
          <div className={styles.performanceLabel}>
            Average Score
          </div>
        </div>
      </div>
      
      {questions.map((question, index) => {
        const feedbackItem = feedback[index];
        if (!feedbackItem) {
          return (
            <div key={index} className={styles.noFeedback}>
              No feedback available for question {index + 1}
            </div>
          );
        }

        return (
          <QuestionFeedback
            key={index}
            question={question}
            feedback={feedbackItem}
            isOpen={index === openQuestionIndex}
            onToggle={() => setOpenQuestionIndex(index === openQuestionIndex ? -1 : index)}
          />
        );
      })}
    </div>
  );
};

export default FeedbackAccordion; 