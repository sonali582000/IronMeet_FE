import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import styles from '../styles/allEvents.module.css'

const AllEventsPage = () => {
  const eventsPerPage = 8;
  const { events, fetchEvents } = useContext(EventContext);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const paginationButtons = [];
    const totalPages = Math.ceil(events.length / eventsPerPage);

    if (totalPages <= 1) return null;

    const maxButtonsToShow = 5; // Maximum number of buttons to show

    if (totalPages <= maxButtonsToShow) {
      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`${styles.paginationButton} ${i === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const leftEllipsis = currentPage > 2;
      const rightEllipsis = currentPage < totalPages - 1;

      paginationButtons.push(
        <button
          key={1}
          className={`${styles.paginationButton} ${1 === currentPage ? styles.active : ''}`}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </button>
      );

      if (leftEllipsis) {
        paginationButtons.push(<span key="leftEllipsis">...</span>);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(currentPage + 1, totalPages - 1);

      for (let i = start; i <= end; i++) {
        paginationButtons.push(
          <button
            key={i}
            className={`${styles.paginationButton} ${i === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (rightEllipsis) {
        paginationButtons.push(<span key="rightEllipsis">...</span>);
      }

      paginationButtons.push(
        <button
          key={totalPages}
          className={`${styles.paginationButton} ${totalPages === currentPage ? styles.active : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        {paginationButtons}
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className={styles.container}>
      <ul className={styles.cardContainer}>
        {currentEvents.map(event => (
          <li key={event._id} className={styles.eventListItem}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
      {renderPagination()}
    </div>
  );
};

export default AllEventsPage;
