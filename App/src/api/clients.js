import axios from './axios.js'

//Peticiones para los clientes
export const getClientsRequest = (id) => axios.get(`/getClients/${id}`)

export const addClient = user => axios.post(`/addClient/`, user);

export const deleteClient = (id) => axios.delete(`/deleteClient/${id}`);

export const getInfoClientRequest = (id) => axios.get(`/getInfoClient/${id}`)

export const putClient = (id, data) => axios.put(`/editClient/${id}`, data);

export const getClientsPropertieRequest = (id) => axios.get(`/getClientsPropertie/${id}`)

export const getFiveClientRequest = (id) => axios.get(`/getFiveClients/${id}`);