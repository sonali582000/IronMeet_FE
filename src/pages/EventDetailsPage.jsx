import { useContext, useEffect, useState } from "react";
import { EventContext } from "../contexts/EventContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AllComment from "../components/AllComment";
import styles from "../styles/EventDetailsPage.module.css";
import comments from "../styles/allComment.module.css";

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

    // console.log(event);
  }, [needsReload]);

  const handleDelete = async (eventId) => {
    // deleteEvent(eventId);
    try {
      const responseDelete = await fetchWithToken(`event/${eventId}`, "DELETE");
      console.log(eventId);
      if (responseDelete.status === 204) {
        alert("Successfully deleted your event ;)");
        navigate("/");
        console.log("deleted");
      } else {
        alert("Error while deleting your event ;(");
      }
    } catch (error) {
      console.log("Error while deleting!!");
    }
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
        message: "Something went wrong while submitting your comment :(",
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

  //for handling submit
  const handleJoinUserSubmit = async () => {
    const data = { userId, eventId };
    try {
      const res = await fetchWithToken("joined", "POST", data);
      if (res.status === 201) {
        alert("Successfully joined the event");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      console.log({
        message: "Something went wrong :(",
      });
    }
  };

  return (
    <div className={styles.eventDetailPageContainer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {event && (
            <div className={styles.eventMiddleContainer}>
              <img
                className={styles.bannerImage}
                src={event.photo}
                alt={event.title}
              ></img>
              <br />

              <div>
                <h2 className={styles.h2}>Event Infos</h2>
                <br />
                <p className={styles.p}>
                  {" "}
                  Event: <br />
                  {event.title}
                </p>
                <br />
                <p className={styles.p}>
                  Description: <br />
                  {event.description}
                </p>
                <br />
                <p className={styles.p}>Location: {event.location}</p>

                <div className={styles.labelContainer}>
                  <label className={styles.outline}>Type: {event.type}</label>
                  <br />
                  <br />
                  <label className={styles.fill}>Status: {event.status}</label>
                </div>
                <button onClick={handleJoinUserSubmit}>Join</button>
                <div className={styles.eventButton}>
                  {event.createdBy === userId && (
                    <>
                      <Link to={`/event/${eventId}`}>
                        <button className={styles.updateEventButton}>
                          Update
                        </button>
                      </Link>
                      {/*  <Link to="/event/new">
                        <button className={styles.CreateEventButton}>
                          Create
                        </button>
                      </Link>
                      */}
                      <Link to="/allEvents">
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(eventId)}
                        >
                          Delete
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={comments.formContainer}>
        <textarea
          rows={2}
          cols={50}
          placeholder="Your Comments"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={comments.comment}
        />
        <button type="submit" className={comments.submit}>
          Submit
        </button>
      </form>
      <div className={comments.containerAllComment}>
        <AllComment handleUpdate={handleUpdate} needsReload={needsReload} />
      </div>
    </div>
  );
};

export default EventDetails;
