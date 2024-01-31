import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AllComment = () => {
  const { eventId } = useParams();
  const [comment, getComment] = useState();
  const { fetchWithToken, userId } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      const response = await fetchWithToken(`comment/${eventId}`, "GET");
      if (response.status === 200) {
        const commentData = response.data;
        getComment(commentData);
      }
    } catch (error) {
      console.log(error);
      console.log({ message: "Error while fetching all comments" });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  return comment ? (
    <>
      <h1>Comments</h1>
      {comment.map((comment) => (
        <div key={comment._id}>
          {userId === comment.madeBy && <p>{comment.text}</p> && <h1>Hello</h1>}
        </div>
      ))}
    </>
  ) : (
    <h2>No comments yet !!</h2>
  );
};

export default AllComment;
