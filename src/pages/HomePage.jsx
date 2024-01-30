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
  
        <ul>
          {events && events.map((event) => (
            <li key={event._id}>{event.title}</li>
          ))}
        </ul>
      </div>

  

 
  );
}

export default HomePage;
