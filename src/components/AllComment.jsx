import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import styles from "../styles/allComment.module.css";
import avatar from "../images/astronaut.png";

const AllComment = ({ handleUpdate, needsReload }) => {
  const { eventId } = useParams();
  const [comments, setComments] = useState([]);
  const { fetchWithToken, userId } = useContext(AuthContext);
  const [commentId, setCommentId] = useState();
  const [text, setText] = useState("");
  const [shouldReload, setShouldReload] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetchWithToken(`comment/event/${eventId}`, "GET");
      if (response.status === 200) {
        const commentData = response.data;
        setComments(commentData);
      }
    } catch (error) {
      console.log(error);
      console.log({ message: "Error while fetching all comments" });
    }
  };
  useEffect(() => {
    if (needsReload) {
      fetchComments();
      fetchOneComment();
      handleSubmit();
      deleteComment();
    }
  }, [eventId, needsReload]);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  // Function to toggle visibility for a specific comment
  const toggleVisibility = async (commentId) => {
    await fetchOneComment(commentId);
    setCommentId(commentId);
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, visible: !comment.visible };
        }
        return comment;
      })
    );
  };

  const fetchOneComment = async (commentId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/${commentId}`
      );
      if (response.status === 200) {
        const eventData = response.data;
        setText(eventData.text);
      }
    } catch (error) {
      console.log("Error with fetching comment data", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = { text, eventId, userId };
      const response = await fetchWithToken(
        `comment/${commentId}`,
        "PUT",
        payload
      );
      if (response.status === 200) {
        alert("Successfully updated your comment ;)!");
        setShouldReload(true);
      } else {
        console.log(response, "Something went wrong while updating comment!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const responseDelete = await fetchWithToken(
        `comment/${commentId}`,
        "DELETE"
      );
      if (responseDelete.status === 204) {
        alert("Successfully deleted your comment ;)");
        setShouldReload(true);
      } else {
        alert("Error while deleting your comment ;(");
      }
    } catch (error) {
      console.log("Error while deleting!!");
    }
  };

  return comments.length ? (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <div key={comment._id}>
          <div className={styles.commentCard}>
            <div className={styles.userInfo}>
              <img
                src={avatar}
                alt="User Avatar"
                className={styles.userAvatar}
              />
            </div>
            <p className={styles.commentText}>{comment.text}</p>
            {/* <button className={styles.likeButton}></button>
            <button className={styles.replyButton}></button> */}
            {comment.madeBy === userId && (
              <>
                <button
                  onClick={() => toggleVisibility(comment._id)}
                  className={styles.updateButton}
                ></button>
                <button
                  onClick={() => deleteComment(comment._id)}
                  className={styles.deleteButton}
                ></button>

                {comment.visible && (
                  <>
                    <form
                      onSubmit={handleSubmit}
                      className={styles.formContainer}
                    >
                      <textarea
                        rows={2}
                        cols={20}
                        placeholder="Your Comments hello"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles.comment}
                      />
                      <button type="submit" className={styles.submit}>
                        Submit
                      </button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </>
  ) : (
    <h2>No comments yet !!</h2>
  );
};
export default AllComment;
