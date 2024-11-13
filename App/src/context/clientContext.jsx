import { createContext, useContext, useState } from "react";
import { getClientsRequest, addClient, deleteClient, getInfoClientRequest, putClient, getClientsPropertieRequest, getFiveClientRequest } from '../api/clients.js'

export const clientContext = createContext();

export const useClient = () => {
    const context = useContext(clientContext);
    if(!context) {
        throw new Error("useClient must be used within an clientProvider")
    }
    return context;
}

export const ClientProvider = ({children}) => {
    const [clientsData, setClients] = useState([]);
    const [client, setClient] = useState([]);
    const [clientsPropertie, setClientsPropertie] = useState([]);
    const [fiveClient, setFiveClient] = useState([]);

    const getFiveClient = async (id) => {
        try{
            const res = await getFiveClientRequest(id);
            setFiveClient(res.data)
        } catch(error){
            console.log(error.response.data);
            alert(error.response.data);
        }
    } 

    const getClients = async (id) => {
        try{
            const res = await getClientsRequest(id);
            setClients(res.data)
        } catch(error){
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

    const getClientPropertie = async (id) => {
        try{
            const response = await getClientsPropertieRequest(id)
            setClientsPropertie(response.data);
        } catch(error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

    const getInfoClient = async (id) => {
        try{
            const response = await getInfoClientRequest(id);
            setClient(response.data);
        } catch(error){
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

    const postClient = async (data) => {
        try{
            const response = await addClient(data);
            console.log(response.data);
            alert("Se añadio el cliente de forma exitosa");
        } catch(error) {
            alert(error.response.data);
        }
    }

    const editClient = async (id, data) => {
        try{
            const response = await putClient(id, data);
            alert("Cambio realizado exitosamente")
        } catch (error){
            console.log(error.response.data);
            alert(error.response.data);
        }
    }

    const removeClient = async (id) => {
        try{
            const response = await deleteClient(id);
            alert(response.data);
        } catch(error) {
            console.log(error)
            alert(error.reponse.data);
        }
    }

    return <clientContext.Provider value = {{
        postClient,
        getClients,
        removeClient,
        getInfoClient,
        editClient,
        getClientPropertie,
        getFiveClient, 
        fiveClient,
        clientsPropertie,
        client,
        clientsData
    }}>
        {children}
    </clientContext.Provider>
}