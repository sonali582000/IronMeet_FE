import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventForm = ({ sameUser = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");
  const { fetchWithToken } = useContext(AuthContext);
  const { eventId } = useParams();

  const getOneEvent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/${eventId}`
      );
      if (response.status === 200) {
        const eventData = response.data;
        setTitle(eventData.title);
        setDescription(eventData.description);
        setDate(eventData.date);
        setCategory(eventData.category);
        setLocation(eventData.location);
        setType(eventData.type);
        setStatus(eventData.status);
        setPhoto(eventData.photo);
        // console.log("Fetched event:", eventData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!sameUser) {
      getOneEvent();
    }
  }, [eventId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqPayload = {
      title,
      description,
      date,
      category,
      location,
      type,
      status,
      photo,
    };

    try {
      const response = await fetchWithToken(
        `${sameUser ? "event" : `event/${eventId}`}`,
        `${sameUser ? "POST" : "PUT"}`,
        reqPayload
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
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description
        <textarea
          rows={1}
          cols={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Category
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        Type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select an option</option>
          <option value="in-person">in-person</option>
          <option value="virtual">virtual</option>
          <option value="hybrid">hybrid</option>
        </select>
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select an option</option>
          <option value="upcoming">upcoming</option>
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
          <option value="canceled">canceled</option>
        </select>
      </label>
      <label>
        Photo
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
      </label>
      <button type="submit">{sameUser ? "Create Event" : "Update"}</button>
    </form>
  );
};

export default EventForm;
