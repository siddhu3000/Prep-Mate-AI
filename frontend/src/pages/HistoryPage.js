import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import FeedbackAccordion from "../components/FeedbackAccordion";
import styles from "../scss/pages/historypage.module.scss";

const SessionCard = ({ session, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={styles.sessionCard}
  >
    <div className={styles.sessionHeader}>
      <span className="material-icons-outlined">school</span>
      <h3>{session.domain} - {session.difficulty}</h3>
    </div>
    <div className={styles.sessionInfo}>
      <p className={styles.difficulty}>
        Score: <span className={styles.scoreSpan}>{session.averageScore.toFixed(1)}/10</span>
      </p>
      <p className={styles.date}>
        {new Date(session.createdAt*1000).toLocaleDateString()}
      </p>
    </div>
  </div>
);

const SessionListItem = ({ session, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`${styles.sessionCard} ${isSelected ? styles.selected : ''}`}
  >
    <div className={styles.sessionHeader}>
      <span className="material-icons-outlined">school</span>
      <h3>{session.domain} - {session.difficulty}</h3>
    </div>
    <div className={styles.sessionInfo}>
      <div>
        <p className={styles.difficulty}>
          {session.correctAnswers}/{session.totalQuestions} questions • {session.averageScore.toFixed(1)}/10 avg
        </p>
        <p className={styles.date}>
          {new Date(session.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.percentage}>
        {session.correctPercentage.toFixed(0)}%
      </div>
    </div>
  </div>
);

const SortDropdown = ({ sortBy, setSortBy }) => (
  <div className={styles.sortContainer}>
    <label className={styles.sortLabel}>Sort by:</label>
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className={styles.sortSelect}
    >
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="score-desc">Highest Score</option>
      <option value="score-asc">Lowest Score</option>
    </select>
  </div>
);

const HistoryPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await API.get("/api/sessions/history");
        
        // Process the sessions data
        const processedSessions = Array.isArray(response.data) ? response.data.map(session => {
          try {
            // Ensure feedback is properly parsed
            const processedFeedback = session.feedback.map(f => {
              if (typeof f === 'string') {
                try {
                  return JSON.parse(f);
                } catch (e) {
                  console.error('Error parsing feedback JSON:', e);
                  return null;
                }
              }
              return f;
            }).filter(f => f !== null);

            // Calculate session statistics
            const correctAnswers = processedFeedback.filter(f => f && f.correct === true).length;
            const totalQuestions = session.questions.length;
            const correctPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
            const averageScore = processedFeedback.reduce((acc, f) => acc + (f && f.score ? f.score : 0), 0) / totalQuestions;

            return {
              ...session,
              feedback: processedFeedback,
              correctAnswers,
              totalQuestions,
              correctPercentage,
              averageScore
            };
          } catch (e) {
            console.error('Error processing session:', e);
            return null;
          }
        }).filter(s => s !== null) : [];

        setSessions(processedSessions);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        const errorMessage = err.response?.data?.error || err.message || "Failed to load session history";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [navigate]);

  const sortSessions = (sessions, sortBy) => {
    const sorted = [...sessions];
    switch (sortBy) {
      case "date-desc":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "date-asc":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "score-desc":
        return sorted.sort((a, b) => b.averageScore - a.averageScore);
      case "score-asc":
        return sorted.sort((a, b) => a.averageScore - b.averageScore);
      default:
        return sorted;
    }
  };

  const sortedSessions = sortSessions(sessions, sortBy);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}>
          <span className="material-icons-outlined">hourglass_empty</span>
          Loading sessions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <span className="material-icons-outlined">error_outline</span>
          {error}
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Interview History</h1>
          <p className={styles.subtitle}>No interviews yet</p>
        </div>
        <div className={styles.emptyState}>
          <span className="material-icons-outlined">history</span>
          <p>No interview sessions found.</p>
          <button
            onClick={() => navigate("/interview")}
            className="primary-button"
          >
            Start Your First Interview
          </button>
        </div>
      </div>
    );
  }

  // Card view (initial state)
  if (!selectedSession) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Interview History</h1>
          <p className={styles.subtitle}>Review your past interview sessions</p>
        </div>
        
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        
        <div className={styles.sessionsGrid}>
          {sortedSessions.map((session, index) => (
            <SessionCard
              key={session._id || index}
              session={session}
              isSelected={false}
              onClick={() => setSelectedSession(session)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Detail view with sidebar
  return (
    <div className={`${styles.container} ${styles.detailView}`}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Sessions</h3>
          <button
            onClick={() => setSelectedSession(null)}
            className={styles.backButton}
          >
            <span className="material-icons-outlined">arrow_back</span>
            Back to Grid
          </button>
        </div>
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        
        
        {sortedSessions.map((session, index) => (
          <SessionListItem
            key={session._id || index}
            session={session}
            isSelected={session === selectedSession}
            onClick={() => setSelectedSession(session)}
          />
        ))}
      </div>

      <div className={styles.detailPanel}>
        <div className={styles.detailHeader}>
          <div>
            <h2>{selectedSession.domain} - {selectedSession.difficulty}</h2>
            <p className={styles.date}>
              {new Date(selectedSession.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className={styles.score}>
            <div className={styles.scoreValue}>
              {selectedSession.correctPercentage.toFixed(0)}%
            </div>
            <div className={styles.scoreLabel}>Correct Answers</div>
          </div>
        </div>
        
        <FeedbackAccordion 
          questions={selectedSession.questions} 
          feedback={selectedSession.feedback}
        />
      </div>
    </div>
  );
};

export default HistoryPage; 