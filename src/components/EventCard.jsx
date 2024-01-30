import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const { _id, title, date, status, location, photo } = event;

    return (
        <div className="event-card" style={{ width: '300px' }}>
            <div className="event-image">
                <img src={photo} alt={title} />
            </div>
            <div className="event-details">
                <h3>{title}</h3>
                <p>Date: {date}</p>
                <p>Status: {status}</p>
                <p>Location: {location}</p>
                <Link to={`/event/${_id}`}>
                    <button>More</button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
