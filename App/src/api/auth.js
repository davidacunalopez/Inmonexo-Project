import axios from './axios.js'

// ------------------- Peticiones para autenticación ------------------------
export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyToken = token => axios.post('/auth/verify', token);

export const getInfoUserRequest = (id) => axios.get(`/infoUser/${id}`)

export const putUserRequest = (id, data) => axios.put(`/editUser/${id}`, data)