import React, { useState } from "react";
import styles from '../scss/components/DomainSelect.module.scss';

const domains = ["DSA", "Web", "DBMS", "OS"];
const difficulties = ["Very Easy", "Easy", "Medium", "Hard", "Challenging"];

const DomainSelect = ({ onSelect, loading }) => {
  const [selected, setSelected] = useState(domains[0]);
  const [difficulty, setDifficulty] = useState(difficulties[2]); // Default to Medium
  
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSelect({ domain: selected, difficulty });
        }}
      >
        <div className={styles.formGroup}>
          <label>Select Domain</label>
          <select 
            value={selected} 
            onChange={(e) => setSelected(e.target.value)}
            className={styles.select}
            disabled={loading}
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Select Difficulty</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className={styles.select}
            disabled={loading}
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Preparing Questions..." : "Start Interview"}
          {loading && <div className={styles.loadingShimmer} />}
        </button>
      </form>
    </div>
  );
};


export default DomainSelect; 