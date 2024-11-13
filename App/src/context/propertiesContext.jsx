import { createContext, useContext, useState } from "react";
import { getPropertiesNameRequest, getMyPropertiesRequest, addPropertieRequest, getPropertieInfoRequest,editPropertieRequest, deletePropertieRequest, putChangeStatusRequest, getPropertieRedRequest, putChangeAgentRequest, getPropertieAlquilerRequest, getPropertieCompraRequest } from '../api/properties.js'

export const propertieContext = createContext();

export const usePropertie = () => {
    const context = useContext(propertieContext);
    if(!context) {
        throw new Error("useClient must be used within an clientProvider")
    }
    return context;
}

export const PropertieProvider = ({children}) => {
    const [propertiesName, setPropertiesName] = useState([]);
    const [propertiesData, setPropertiesData] = useState([]);
    const [propertie, setPropertie] = useState([]);
    const [propertiesRed, setPropertiesRed] = useState([]);
    const [propertieCompra, setPropertieCompra] = useState([]);
    const [propertieAlquiler, setPropertieAlquiler] = useState([]);

    const getPropertieAlquiler = async (id) => {
        try{
            const response = await getPropertieAlquilerRequest(id);
            setPropertieAlquiler(response.data);
        } catch (error){
            alert(error.response.data)
        }
    }

    const getPropertieCompra = async (id) => {
        try{
            const response = await getPropertieCompraRequest(id);
            setPropertieCompra(response.data);
        } catch (error){
            alert(error.response.data)
        }
    }


    const getPropertiesName = async (id) => {
        try{
            const response = await getPropertiesNameRequest(id);
            setPropertiesName(response.data);
        } catch(error){
            alert(error.response.data)
        }
    }

    const getPropertieInfo = async (id) => {
        try{
            const response = await getPropertieInfoRequest(id);
            setPropertie(response.data);
        } catch (error) {
            alert(error.response.data)
        }
    }

    const getMyProperties = async (id) => {
        try{
            const response = await getMyPropertiesRequest(id);
            setPropertiesData(response.data)
        } catch(error) {
            alert(error.response.data)
        }
    }

    const getPropertieRed = async () => {
        try{
            const response = await getPropertieRedRequest();
            setPropertiesRed(response.data)
        } catch (error){
            alert(error.response.data)
        }
    }

    const addPropertie = async (data) => {
        try{
            const response = await addPropertieRequest(data);
            alert("Se añadio de propiedad exitosamente");
        } catch(error) {
            alert(error.response.data);
        }
    }
    
    const editPropertie = async (id, data) => {
        try{
            const response = await editPropertieRequest(id, data);
            console.log(response);
            alert("Los cambios se realizaron correctamente")
        } catch(error) {
            console.log(error.response.data)
            alert(error.response.data);
        }
    }

    const changeStatus = async (id, data) => {
        try{
            const response = await putChangeStatusRequest(id, data)
            alert("Cambio de estados realizado correctamente")
        } catch(error) {
            console.log(error.response.data)
            alert(error.response.data);
        }
    }

    const changeAgent = async (id, data) => {
        try{
            const response = await putChangeAgentRequest(id, data)
            alert("Cambio de estados realizado correctamente")
        } catch(error) {
            console.log(error.response.data)
            alert(error.response.data);
        }
    }

    const deletePropertie = async (id) => {
        try{
            const response = await deletePropertieRequest(id);
            alert("Propiedad eliminada correctamente");
        } catch(error) {
            console.log(error.response.data)
            alert(error.response.data);
        }
    }

    return <propertieContext.Provider value={{
        getPropertiesName,
        getMyProperties,
        addPropertie,
        getPropertieInfo,
        editPropertie,
        deletePropertie,
        changeStatus,
        getPropertieRed,
        changeAgent,
        getPropertieAlquiler,
        getPropertieCompra,
        propertieAlquiler,
        propertieCompra,
        propertiesRed,
        propertie,
        propertiesData,
        propertiesName
    }}>
        {children}
    </propertieContext.Provider>
}
