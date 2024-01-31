import React from 'react';
import styles from '../styles/Footer.module.css'; 

function Footer() {
    return (
        <div className={styles.footerWrapper}>
            <footer className={styles.footer}>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <p>ironMeet</p>
                    </div>
                    <div className={styles.column}>
                        <p>ironMeet</p>
                    </div>
                    <div className={styles.column}>
                        <p>Ironmeet</p>
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default Footer;