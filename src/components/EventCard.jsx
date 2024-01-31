import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/eventCard.module.css'

const EventCard = ({ event }) => {
  return (
    <div className={styles.eventCard}>
      <img src={event.photo} alt="Event" className={styles.eventImage} />
      <div className={styles.eventDetails}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDate}>Date: {event.date}</p>
        <p className={styles.eventLocation}>Location: {event.location}</p>
        <p className={styles.eventStatus}>Status: {event.status}</p>
        <Link to={`/eventDetail/${event._id}`}>
        <button className={styles.moreButton}>More</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
