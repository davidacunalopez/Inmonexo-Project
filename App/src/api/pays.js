import axios from './axios.js'

export const getPaysRequest = () => axios.get(`/getPays`);

export const getPaysPropertieRequest = (id) => axios.get(`/getPayPropertie/${id}`);

export const addPayRequest = (data) => axios.post(`/addPays`, data);

export const deletePayRequest = (id) => axios.delete(`/deletePay/${id}`)

export const getUserPays = (id) => axios.get(`/getUserPays/${id}`)