import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import homepagepic from '../assets/irl_event.png'
import styles from '../styles/HomePage.module.css'
import { Link } from 'react-router-dom';

const HomePage = () => {
  const eventsToShowInitially = 4;
  const eventsPerLoad = 4;
  const { events, fetchEvents } = useContext(EventContext);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));
      setVisibleEvents(sortedEvents.slice(0, eventsToShowInitially));
    }
  }, [events]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredEvents);
    }
  }, [searchQuery, events]);

  const handleLoadMore = () => {
    const nextEvents = events.slice(visibleEvents.length, visibleEvents.length + eventsPerLoad);
    setVisibleEvents(prevEvents => [...prevEvents, ...nextEvents]);
  };

  return (
    <div>
      <div className={styles.welcomeContainer}>
        <div className={styles.textContainer} >
          <h1>Welcome To Iron Meet!</h1>
          <span>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of IronHackers who share it on Iron Meet. Events are happening every day—sign up to join the fun.</span></div>
        <img src={homepagepic} alt="meetup" />
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchTitles}>
          <h3>Search Events</h3>
          <Link to="/allEvents" className={styles.link} >all events</Link>
        </div>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <ul className={styles.cardContainers} >
          {searchResults.map(event => (
            <li key={event._id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
    
        
      </div>
      <div className={styles.recentContainer}>
        <h3>Recent Events</h3>
        <ul className={styles.cardContainers}>
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
    </div>

  );
};

export default HomePage;
