import {createContext, useState, useContext, useEffect, } from 'react'
import {postEventRequest, getEventsRequest, editEventRequest, deleteEventRequest} from '../api/events.js'

export const EventContext = createContext();

export const useEvent = () => {
    const context = useContext(EventContext);
    if(!context) {
        throw new Error("useEvent must be used within an authProvider")
    }
    return context;
};

export const EventProvider = ({children}) => {
    
    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const postEvent = async (event) => {
        try{
            const res = await postEventRequest(event);
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    };

    // Función para obtener eventos por ID de usuario
    const getEvents = async (userId) => {
        try {
            const res = await getEventsRequest(userId);
            setEvents(res.data); // Actualiza el estado con los eventos obtenidos
        } catch (error) {
            console.log(error);
        }
    };

    const editEvent = async (id, updatedData) => {
        try {
          const res = await editEventRequest(id, updatedData); // Llama a la función editEventRequest
          // Actualiza el evento en la lista local
          setEvents(events.map(event => event.id === id ? res.data[0] : event));
        } catch (error) {
          console.error("Error al editar el evento:", error);
        }
    };

    const deleteEvent = async (id) => {
        try {
            await deleteEventRequest(id);
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error("Error al eliminar el evento:", error);
        }
    };

    return (
        <EventContext.Provider value={{
            postEvent,
            getEvents,
            editEvent,
            deleteEvent,
            events,
            event
        }}>
            {children}
        </EventContext.Provider>
    )
};