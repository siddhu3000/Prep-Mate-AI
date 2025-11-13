import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../scss/components/RegisterForm.module.scss';

const RegisterForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! Please login.");
        onSuccess && onSuccess();
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Network error");
    }
  };
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.formCard}>
          {/* Logo and Header Section */}
          <div className={styles.formHeader}>
            <div className={styles.logoWrapper}>
              <img src="/logo.png" alt="Prep-Mate-AI Logo" className={styles.logo} />
            </div>
            <h2 className={styles.title}>Create your account</h2>
            <p className={styles.subtitle}>Join Prep-Mate-AI and start your journey to success</p>
          </div>

          {/* Alert Messages */}
          {success && <div className={styles.alertSuccess}>{success}</div>}
          {error && <div className={styles.alertError}>{error}</div>}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                id="username"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
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
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonText}>Create Account</span>
              <span className={`${styles.buttonIcon} material-icons`}>person_add</span>
            </button>
          </form>

          {/* Footer Links */}
          <div className={styles.formFooter}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.footerLink}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
  //     <form onSubmit={handleSubmit}>
  //       <h2>Register</h2>
  //       {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
  //       {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}
  //       <div style={{ marginBottom: "10px" }}>
  //         <input 
  //           name="username" 
  //           placeholder="Username" 
  //           value={form.username} 
  //           onChange={handleChange} 
  //           required 
  //           style={{ width: "100%", padding: "8px" }}
  //         />
  //       </div>
  //       <div style={{ marginBottom: "10px" }}>
  //         <input 
  //           name="email" 
  //           type="email" 
  //           placeholder="Email" 
  //           value={form.email} 
  //           onChange={handleChange} 
  //           required 
  //           style={{ width: "100%", padding: "8px" }}
  //         />
  //       </div>
  //       <div style={{ marginBottom: "10px" }}>
  //         <input 
  //           name="password" 
  //           type="password" 
  //           placeholder="Password" 
  //           value={form.password} 
  //           onChange={handleChange} 
  //           required 
  //           style={{ width: "100%", padding: "8px" }}
  //         />
  //       </div>
  //       <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none" }}>
  //         Register
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default RegisterForm; 