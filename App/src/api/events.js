import axios from './axios.js'

//Peticiones a los eventos

export const postEventRequest = (data) => axios.post(`/addEvent`, data);

export const getEventsRequest = (id) => axios.get(`/getEvents/${id}`);

export const editEventRequest = (id, data) => axios.put(`/editEvent/${id}`, data);

export const deleteEventRequest = (id) => axios.delete(`/deleteEvent/${id}`);