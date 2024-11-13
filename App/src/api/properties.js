import axios from './axios.js'

export const getPropertiesNameRequest = (id) => axios.get(`/getPropertiesName/${id}`);

export const getPropertieInfoRequest = (id) => axios.get(`getInfoPropertie/${id}`);

export const getMyPropertiesRequest = (id) => axios.get(`/getMyProperties/${id}`);

export const getPropertieRedRequest = () => axios.get(`/getPropertieRed`)

export const addPropertieRequest = (data) => axios.post(`/addPropertie`, data);

export const editPropertieRequest = (id, data) => axios.put(`/editPropertie/${id}`, data);

export const deletePropertieRequest = (id) => axios.delete(`/deletePropertie/${id}`);

export const putChangeStatusRequest = (id, data) => axios.put(`/changeStatusRed/${id}`, data)

export const putChangeAgentRequest = (id, data) => axios.put(`/changeStatusAgent/${id}`, data)

export const getPropertieAlquilerRequest = (id) => axios.get(`/getPropertiesAlquiler/${id}`);

export const getPropertieCompraRequest = (id) => axios.get(`/getPropertiesCompra/${id}`);