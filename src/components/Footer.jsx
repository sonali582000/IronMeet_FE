import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <Link to="/event/new">
              <p>Create Event</p>
            </Link>
          </div>
          <div className={styles.column}>
            <Link to="/allEvents">
              <p>All Events</p>
            </Link>
          </div>
          <div className={styles.column}>
            <Link to="/about">
              <p>About Us</p>
            </Link>
          </div>
        </div>
      </footer>
      <div className={styles.copyrights}>
        <p> &copy;2024 Iron Meet. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
