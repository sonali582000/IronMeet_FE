import { useContext, useEffect } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from '../components/EventCard';

const AllEventsPage = () => {
    const { events, fetchEvents } = useContext(EventContext);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <div className="all-events-page">
            <h2>All Events</h2>
            <div className="event-list">
                {events.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default AllEventsPage;
