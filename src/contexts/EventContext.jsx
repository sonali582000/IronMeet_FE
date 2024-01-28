import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const EventContext = createContext();

const EventContextProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState([]);

    const fetchEvents = async () => {
        try {

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/event`)

            if(response === 200){
                const eventsData = response.data
                setEvents(eventsData)
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const fetchOneEvent = async (_id) =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/${_id}`)
            if(response === 200){
                const eventData = response.data
                setEvent(eventData)
                console.log("Fetched event:", eventData);
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchEvents()
        console.log("Events:",events)
    },[])


    return(
        <EventContext.Provider value={{fetchEvents, events, fetchOneEvent, event}}>
            {children}
        </EventContext.Provider>
    )

}


export default EventContextProvider