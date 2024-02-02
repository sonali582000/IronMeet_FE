import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

const EventContextProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/event`);

      if (response.status === 200) {
        const eventsData = response.data;
        setEvents(eventsData);
        // console.log("Events:", eventsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOneEvent = async (eventId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/${eventId}`
      );
      if (response.status === 200) {
        const eventData = response.data;
        setEvent(eventData);
        // console.log("Fetched event:", eventData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const newEvent = async (newEventData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/event`,
        newEventData
      );
      if (response.status === 201) {
        const addedEvent = response.data;
        setEvents((prevEvents) => [...prevEvents, addedEvent]);
        // console.log(addedEvent, "new event added");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvent = async (eventId, updatedEvent) => {
    try {
      const response = await fetchWithToken(
        `event/${eventId}`,
        "PUT",
        updatedEvent
      );
      if (response.status === 200) {
        const updatedEvent = response.data;
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          )
        );
        navigate("/");
        // console.log("Event updated:", updatedEvent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetchWithToken(`event/${eventId}`, "DELETE");
      if (response.status === 200) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
        navigate("/");
        console.log("Event deleted:", eventId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        fetchEvents,
        events,
        fetchOneEvent,
        event,
        newEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
