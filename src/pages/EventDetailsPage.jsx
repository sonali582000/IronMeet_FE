import { useContext, useEffect, useState } from "react";
import { EventContext } from "../contexts/EventContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AllComment from "../components/AllComment";

const EventDetails = () => {
  const { fetchOneEvent, deleteEvent, event } = useContext(EventContext);
  const { userId, fetchWithToken } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [commentId, setCommentId] = useState("");
  const [needsReload, setNeedsReload] = useState(true);

  useEffect(() => {
    if (needsReload) {
      fetchOneEvent(eventId);
      setNeedsReload(false);
    }

    // console.log(event)
  }, [needsReload]);

  const handleDelete = () => {
    event.preventDefault();
    deleteEvent(eventId);
    console.log("deleted");
    navigate("/");
  };

  //for creating comments
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { text, eventId, userId };

    try {
      const response = await fetchWithToken(`comment`, "POST", payload);
      if (response.status === 201) {
        alert("Your comment is saved!!");
        setNeedsReload(true);
      }
    } catch (error) {
      console.log(error);
      console.log({
        message: "Some went wrong while submitting your comment :(",
      });
    }
  };

  //for updating comments
  const handleUpdate = async (event) => {
    event.preventDefault();
    const payload = { text, eventId, userId, commentId };

    try {
      const response = await fetchWithToken(
        `comment/${commentId}`,
        "PUT",
        payload
      );
      if (response.status === 201) {
        alert("Your comment is updated!!");
      }
    } catch (error) {
      console.log(error);
      console.log({
        message: "Some went wrong while updating your comment :(",
      });
    }
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
            <button>Create</button>
          </Link>
        </>
      )}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <textarea
          rows={2}
          cols={50}
          placeholder="Your Comments"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <AllComment handleUpdate={handleUpdate} needsReload={needsReload} />
    </>
  );
};

export default EventDetails;
