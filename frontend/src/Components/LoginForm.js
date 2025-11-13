import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import styles from "../scss/components/LoginForm.module.scss";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token);
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.formCard}>
          {/* Logo and Header Section */}
          <div className={styles.formHeader}>
            <div className={styles.logoWrapper}>
              <img src="/logo.png" alt="Prep-Mate-AI Logo" className={styles.logo} />
            </div>
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Sign in to continue your interview preparation</p>
          </div>

          {/* Alert Messages */}
          {error && <div className={styles.alertError}>{error}</div>}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonText}>Sign In</span>
              <span className={`${styles.buttonIcon} material-icons`}>login</span>
            </button>
          </form>

          {/* Footer Links */}
          <div className={styles.formFooter}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.footerLink}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 