import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const { fetchWithToken } = useContext(AuthContext);
  const { commentId } = useParams();

  const getOneComment = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/${commentId}`
      );
      if (response.status === 200) {
        const commentData = response.data;
        setComment(commentData.comment);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOneComment();
  }, []);

  const handleSubmit = async (comment) => {
    comment.preventDefault();
    const reqPayload = {
      comment,
    };

    try {
      const response = await fetchWithToken(
        `comment/${commentId}`,
        "PUT",
        reqPayload
      );

      console.log(response.status);
      // update new comment
      if (response.status === 200) {
        alert("Successfully updated an comment!");
      } else {
        console.log(response, "Something went wrong while updating an comment");
      }
    } catch (error) {
      console.log("error in comment!!", error);
    }
  };

  return (
    <>
      <h1>"Update an comment"</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>
          comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <link to={`comment/${commentId}`}>
          <button onSubmit={handleSubmit}> Update</button>
        </link>
      </form>
    </>
  );
};

export default EventForm;
