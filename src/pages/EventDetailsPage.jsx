import { useContext, useEffect } from "react";
import { EventContext } from "../contexts/EventContext";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { fetchOneEvent, event } = useContext(EventContext);
  const { eventId } = useParams();
  const { fetchOneEvent, event, deleteEvent } = useContext(EventContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneEvent(eventId);
    // console.log(event)
  }, []);
  useEffect(() => {
    fetchOneEvent(eventId);
  }, [fetchOneEvent, eventId]);

  const handleDelete = () => {
    deleteEvent(eventId);
  };

  return (
    <>
      <h1>Event details</h1>
      {event && (
        <>
          <p>{event.title}</p>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </>
  );
};

export default EventDetails;
