import { useContext, useEffect } from "react";
import { EventContext } from "../contexts/EventContext";
import { useParams } from "react-router-dom";
import AllComment from "../components/AllComment";

const EventDetails = () => {
  const { fetchOneEvent, event } = useContext(EventContext);
  const { eventId } = useParams();

  useEffect(() => {
    fetchOneEvent(eventId);
    // console.log(event)
  }, []);

  return (
    <>
      <h1>Event details</h1>
      {event && <p>{event.title}</p>}
      <AllComment />
    </>
  );
};

export default EventDetails;
