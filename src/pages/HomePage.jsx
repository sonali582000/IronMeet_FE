import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import styles from "../styles/HomePage.module.css"

function HomePage() {
  const { events } = useContext(EventContext);

  useEffect(() => {
    //console.log(events)
  }, [events]);
  return (
    <div>
      <div className={styles.welcomeTitle}>
        <span>Welcome to ironMeet!</span>
      </div>
      <div className={styles.homeButtonsContainer} >
        <Link to="/signup">
          <button className={styles.homeButton}>Go to Signup</button>
        </Link>
        <Link to="/login">
          <button className={styles.homeButton}>Go to Login</button>
        </Link>
        <ul>
          {events && events.map((event) => (
            <li key={event._id}>{event.title}</li>
          ))}
        </ul>
      </div>
    </div>
  

 
  );
}

export default HomePage;
