import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const EventContext = createContext();

const EventContextProvider = ({children}) => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/event`)

            console.log(response.data)

            if(response === 200){
                const eventsData = response.eventsData
                setEvents(eventsData)
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchEvents()
    },[])


    return(
        <EventContext.Provider value={{fetchEvents, events}}>
            {children}
        </EventContext.Provider>
    )

}


export default EventContextProvider