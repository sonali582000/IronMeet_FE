import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";
import EventCard from "../components/EventCard";

function HomePage() {
  const { events } = useContext(EventContext);

  useEffect(() => {
    //console.log(events)
  }, [events]);
  return (
    <div>
      <h1>Welcome to ironMeet!</h1>
      <Link to="/signup">
        <button>Go to Signup</button>
      </Link>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
      <ul>
        {events &&
          events.map((event) => {
            <li key={event._id}>{event.title}</li>;
          })}
      </ul>
      <EventCard />
    </div>
  );
}

export default HomePage;
