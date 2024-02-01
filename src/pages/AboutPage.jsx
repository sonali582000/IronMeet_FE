import React from "react";
import styles from "../styles/aboutus.module.css";
import profile1 from "../images/kubra.jpg";
import profile2 from "../images/sonali.jpg";
import profile3 from "../images/yimen.png";
import profile4 from "../images/julieta.jpeg";
import github from "../images/github.png";
import linkedin from "../images/linkedin.png";

function AboutPage() {
  return (
    <>
      <h1 className={styles.title}>
        Together, let's inspire, innovate, and impact. Welcome to IronMeet
      </h1>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src={profile1} alt="Kübra Tokgözlü" />
          <h2>Kübra Tokgözlü</h2>
          <p>Web Developer</p>
          <a
            href="https://www.linkedin.com/in/kubra-tokgozlu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a
            href="https://github.com/KubraTY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="LinkedIn" />
          </a>
        </div>
        <div className={styles.profile}>
          <img src={profile2} alt="Sonali Rathod" />
          <h2>Sonali Rathod</h2>
          <p>Web Developer</p>
          <a
            href="https://www.linkedin.com/in/sonali-rathod-917934208/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>

          <a
            href="https://github.com/sonali582000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="LinkedIn" />
          </a>
        </div>
        <div className={styles.profile}>
          <img src={profile3} alt="Yiman H." />
          <h2>Yiman H.</h2>
          <p>Web Developer</p>
          <a
            href="https://www.linkedin.com/in/yiman-h-389946210/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>

          <a
            href="https://github.com/VivianeHuang2022"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="LinkedIn" />
          </a>
        </div>
        <div className={styles.profile}>
          <img src={profile4} alt="Julieta Dalla Pozza" />
          <h2>Julieta Dalla Pozza</h2>
          <p>Web Developer</p>
          <a
            href="https://www.linkedin.com/in/julietadallapozza/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>

          <a
            href="https://github.com/Julietadallapozza"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
