import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <Link to="/allEvents">
              <p>All Events</p>
            </Link>
          </div>
          <div className={styles.column}>
            <Link to="/">
              <p>@2024 Iron Meet CopyWrite</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
