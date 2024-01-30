import React, { useState, useEffect, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from '../components/EventCard';

const AllEventsPage = () => {
  const eventsPerPage = 3;
  const maxPaginationButtons = 5; // Maximum number of pagination buttons to display
  const [currentPage, setCurrentPage] = useState(1);
  const { events, fetchEvents } = useContext(EventContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    if (totalPages <= maxPaginationButtons) {
      return pages.map(page => (
        <button key={page} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ));
    } else {
      // Display the first few pages, an ellipsis, and the last few pages
      const leftPages = Math.floor(maxPaginationButtons / 2);
      const rightPages = maxPaginationButtons - leftPages - 1;

      const firstPage = currentPage - leftPages > 1 ? currentPage - leftPages : 1;
      const lastPage = currentPage + rightPages < totalPages ? currentPage + rightPages : totalPages;

      return (
        <div>
          {firstPage > 1 && (
            <>
              <button onClick={() => handlePageChange(1)}>1</button>
              <span>...</span>
            </>
          )}
          {pages.slice(firstPage - 1, lastPage).map(page => (
            <button key={page} onClick={() => handlePageChange(page)}>
              {page}
            </button>
          ))}
          {lastPage < totalPages && (
            <>
              <span>...</span>
              <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div style={{ padding: 200 }}>
      <h1>All Events</h1>
      <ul>
      {currentEvents.map(event => (
        <li key={event._id} >
            <EventCard event={event} />
        </li>
      ))}
      </ul>
      
      <div>{renderPagination()}</div>
    </div>
  );
};

export default AllEventsPage;
