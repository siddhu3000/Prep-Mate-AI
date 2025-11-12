import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import styles from '../scss/components/Navbar.module.scss';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      logout();
    } else {
      navigate(`/${action}`);
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.headerContent}`}>
            {/* Logo LEFT Part */}
            <Link to="/" className={`${styles.logoSection}`}>
              <img 
                alt="Prep Mate AI Logo" 
                className={`${styles.logoImage}`} 
                src="/logo.png"
              />
              <h1 className={`${styles.logoText}`}>Prep Mate AI</h1>
            </Link>
            {/* Center Nav Links Part */}
            <nav className={`${styles.navDesktop}`}>
              <Link to="/" className={`${styles.navLink}`}>Home</Link>
              <Link to="/interview" className={`${styles.navLink}`}>Interview</Link>
              <Link to="/history" className={`${styles.navLink}`}>History</Link>
            </nav>

            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              {token ? (
                <button onClick={() => handleAuthAction('logout')} className={`${styles.authButton} ${styles.logoutButton}`}>
                  Logout
                </button>
              ) : (
                <>
                  <button onClick={() => handleAuthAction('login')} className={`${styles.authButton} ${styles.loginButton}`}>
                    Login
                  </button>
                  <button onClick={() => handleAuthAction('register')} className={`${styles.authButton} ${styles.registerButton}`}>
                    Register
                  </button>
                </>
              )}
            </div>
            {/* Login/Register Buttons */}
            <button className={`${styles.mobileMenuButton}`} onClick={toggleMobileMenu}>
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </header>
  );
};

export default Navbar; 
