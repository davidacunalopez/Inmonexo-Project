import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest, loginRequest, verifyToken, getInfoUserRequest, putUserRequest} from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an authProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [dataUser, setDataUser] = useState({})

    const register = async (user) => {
        try {
            const res = await registerRequest(user);
        } catch(error) {
            setErrors(error.response.data)
        }
    }

    const login  = async (user) => {
        try{
            const res = await loginRequest(user);
            alert(res.data.message)
            setIsAuthenticated(true);
            setIsLoading(false);
            setUser(res.data.userId);
            
        } catch(error) {
            setErrors(error.response.data);
            setIsLoading(false);
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    const userInfoRequest = async (id) => {
        try{
            const result = await getInfoUserRequest(id);
            setDataUser(result.data)
        } catch(error){
            console.log(error);
        }
    }

    const editUser = async (id, data) => {
        try{
            const response = await putUserRequest(id, data);
            alert(response.data.message);
            console.log(response.data.message);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() =>{
    async function checkLogin () {
        const cookies = Cookies.get();
        console.log(cookies.token)
        console.log(isAuthenticated);
        console.log(isLoading)
        if(!cookies.token){
            setIsAuthenticated(false);
            setIsLoading(false);
            return
        }
        try{
            const response = await verifyToken({token : cookies.token});
            console.log(response)
            if(!response.data){
                return setIsAuthenticated(false)
            }
            setIsAuthenticated(true);
            setIsLoading(false);
            setUser(response.data);
        } catch (error){
            console.log(error);
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    };
    checkLogin();
    }, [])

    return (
        <AuthContext.Provider value = {{
            register,
            login,
            userInfoRequest,
            editUser,
            dataUser,
            user,
            isAuthenticated,
            isLoading,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}