import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from '../components/EventCard';

const HomePage = () => {
  const eventsToShowInitially = 4;
  const eventsPerLoad = 4;
  const { events, fetchEvents } = useContext(EventContext);
  const [visibleEvents, setVisibleEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));
      setVisibleEvents(sortedEvents.slice(0, eventsToShowInitially));
    }
  }, [events]);

  const handleLoadMore = () => {
    const nextEvents = events.slice(visibleEvents.length, visibleEvents.length + eventsPerLoad);
    setVisibleEvents(prevEvents => [...prevEvents, ...nextEvents]);
  };

  return (
    <div style={{ padding: 200 }}>
      <h1>Recent Events</h1>
      <ul>
        {visibleEvents.map(event => (
          <li key={event._id}>
            <EventCard event={event} />
          </li>

        ))}
      </ul>

      {visibleEvents.length < events.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default HomePage;
