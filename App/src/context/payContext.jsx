import { createContext, useContext, useState } from "react";
import {getPaysPropertieRequest, addPayRequest, getPaysRequest, deletePayRequest, getUserPays} from '../api/pays.js'

export const payContext = createContext();

export const usePay = () => {
    const context = useContext(payContext);
    if(!context) {
        throw new Error("useClient must be used within an clientProvider")
    }
    return context;
}

export const PayProvider = ({children}) => {

    const [payPropertie, setPayPropertie] = useState([]);
    const [newPay, setNewPay] = useState([]);
    const [pays, setPays] = useState([]);
    const [userPays, setUserPays] = useState([]); 

    const getPaysPropertie = async (id) =>{
        try{
            const result = await getPaysPropertieRequest(id);
            setPayPropertie(result.data);
        } catch(error){
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    const getPaysUser = async (id) =>{
        try{
            const result = await getUserPays(id);
            setUserPays(result.data);
        } catch(error){
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    const getPays = async () => {
        try{
            const response = await getPaysRequest();
            setPays(response.data);
        } catch(error){
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    const addPay = async (data) => {
        try{
            const response = await addPayRequest(data);
            alert("Pago agregado exitosamente")
            setNewPay(response.data)
        } catch(error) {
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    const deletePay = async (id) => {
        try{
            const response = await deletePayRequest(id);
            alert("Pago eliminado exitosamente.")
        } catch (error) {
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    return <payContext.Provider value={{
        getPaysPropertie,
        addPay,
        getPays,
        deletePay,
        getPaysUser,
        userPays,
        pays,
        newPay,
        payPropertie
    }}>
        {children}
    </payContext.Provider>
}