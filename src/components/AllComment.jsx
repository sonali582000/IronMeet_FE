import { useContext, useEffect, useState } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AllComment = ({ handleUpdate, needsReload }) => {
  const { eventId } = useParams();
  const [comment, getComment] = useState();
  const { fetchWithToken, userId } = useContext(AuthContext);
  const [commentId, setCommentId] = useState();
  const [visible, setVisible] = useState(false);

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
    if (needsReload) {
      fetchComments();
    }
  }, [eventId, needsReload]);

  return comment ? (
    <>
      <h1>Comments</h1>
      {comment.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          {console.log("comment", comment.madeBy, "user", userId)}
          {comment.madeBy === userId && (
            <>
              <Link to={`/comment/${comment._id}`}>
                <button
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  Update Comment
                </button>
              </Link>
            </>
          )}
          {visible ? <p>Test</p> : null}
        </div>
      ))}
    </>
  ) : (
    <h2>No comments yet !!</h2>
  );
};

export default AllComment;
