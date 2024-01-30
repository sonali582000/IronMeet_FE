//props: (1)input text form user(req.body) (2)eventId(req.params) (3)token from headers(private route)
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommentForm = () => {
  const [text, setText] = useState("");
  const { fetchWithToken } = useContext(AuthContext);
  const { eventId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commentToCreate = { text };

    try {
      const response = await fetchWithToken(
        `event/${eventId}`,
        "POST",
        commentToCreate
      );

      console.log(response.status);
      // For new event
      if (response.status === 201) {
        // const newEvent = response.data;
        alert("Successfully created an Event!");
      } else {
        console.log(response, "Something went wrong while creating an event");
      }
      // For update event
      if (response.status === 200) {
        alert("Successfully updated an Event!");
      } else {
        console.log(response, "Something went wrong while updating an event");
      }
    } catch (error) {
      console.log("error in Event!!", error);
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <label>
        Comment
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button type="submit">submit</button>
    </form>
  );
};

export default CommentForm;
