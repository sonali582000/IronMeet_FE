import { useContext, useEffect, useState } from "react";
import { EventContext } from "../contexts/EventContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const EventDetails = () => {
  const { fetchOneEvent, event } = useContext(EventContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneEvent(eventId);
    //console.log(event)
  }, [eventId]);

  const handleDelete = async () => {
    try {
      const response = await fechWithToken(`/event${eventId}`, "DELETE");
      if (response.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return event ? (
    <>
      <h1>Event Details</h1>
      <p>{event.title}</p>
      <p>{event.category}</p>
      <p>{event.location}</p>
      <p>{event.type}</p>
      <p>{event.status}</p>
      <p>{event.photo}</p>

      {userId === event.createdBy && (
        <>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/event/${event._id}/update`}>Update</Link>
        </>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

export default EventDetails;
