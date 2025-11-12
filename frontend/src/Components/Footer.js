import styles from '../scss/components/Footer.module.scss';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <img
                  alt="Prep-Mate-AI Logo"
                  className={styles.footerLogoImage}
                  src="/logo.png"
                />
                <h4 className={styles.footerLogoText}>Prep-Mate-AI</h4>
              </div>
              <p className={styles.footerBrandDescription}>
                The ultimate AI-powered platform to prepare for your tech interviews and land your dream job.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h5 className={styles.footerColumnTitle}>Product</h5>
                <ul className={styles.footerColumnList}>
                  <li><Link className={styles.footerLink} to="/">Home</Link></li>
                  <li><Link className={styles.footerLink} to="/interview">Interview</Link></li>
                  <li><Link className={styles.footerLink} to="/history">History</Link></li>
                </ul>
              </div>
              {/* <div className={styles.footerColumn}>
                <h5 className={styles.footerColumnTitle}>Legal</h5>
                <ul className={styles.footerColumnList}>
                  <li><Link className={styles.footerLink} to="#">Privacy Policy</Link></li>
                  <li><Link className={styles.footerLink} to="#">Terms of Service</Link></li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>© 2025 Prep-Mate-AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer;