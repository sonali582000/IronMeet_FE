import { useContext, useEffect } from "react";
import { EventContext } from "../contexts/EventContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const EventDetails = () => {
  const { fetchOneEvent, deleteEvent, event } = useContext(EventContext);
  const { userId } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneEvent(eventId);
    // console.log(event)
  }, []);

  const handleDelete = () => {
    event.preventDefault();
    deleteEvent(eventId);
    console.log("deleted");
    navigate("/");
  };

  return (
    <>
      <h1>Event details</h1>
      {event && (
        <>
          <p>Title: {event.title}</p>
          <p>Description: {event.description}</p>
          <p>Location: {event.location}</p>
          <p>Type: {event.type}</p>
          <p>Status: {event.status}</p>
          <p>Photo: {event.photo}</p>
        </>
      )}

      {event.createdBy === userId && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/event/${eventId}`}>
            <button>Update</button>
          </Link>
          <Link to="/event/new">
            <button>Edit</button>
          </Link>
        </>
      )}
    </>
  );
};

export default EventDetails;
