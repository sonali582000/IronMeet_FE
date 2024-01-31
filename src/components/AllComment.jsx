import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useFetcher, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const AllComment = ({ handleUpdate, needsReload }) => {
  const { eventId } = useParams();
  const [comments, setComments] = useState([]);
  const { fetchWithToken, userId } = useContext(AuthContext);
  const [commentId, setCommentId] = useState();
  const [text, setText] = useState("");

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
    }
  }, [eventId, needsReload]);
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
      } else {
        console.log(response, "Something went wrong while updating comment!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return comments.length ? (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>

          {comment.madeBy === userId && (
            <>
              <button onClick={() => toggleVisibility(comment._id)}>
                Update
              </button>
              {/* <button onClick={() => toggleVisibility(comment._id)}>
                Delete
              </button> */}
              {comment.visible && (
                <>
                  <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={handleSubmit}
                  >
                    <textarea
                      rows={2}
                      cols={20}
                      placeholder="Your Comments"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </>
  ) : (
    <h2>No comments yet !!</h2>
  );
};
export default AllComment;
