import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { URL } from "../constants/endpoints";
const URL = process.env.REACT_APP_API_URL;
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {


    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('userToken'))||[]);


    const navigate = useNavigate();
    // const [loginError, showLoginError] = useState(false)
    // const [errorMsg, setErrorMsg] = useState('')
    async function login(userLogin) {
        try {
            
            const login = await axios.post(`${URL}/login`, userLogin);
            localStorage.setItem('userToken', JSON.stringify(login.data.token));
            setToken(login.data.token)
            setUser(login.data.user)
            navigate('/');
        } catch (error) {
            console.log("Login fallido",error)
            

        }
    }
    const logout = ()=> {
        console.log('logout')
        localStorage.removeItem('userToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('inCart');
        setUser(null);
        navigate('/login')
    }

    useEffect(()=> {
        setUser(JSON.parse(localStorage.getItem("currentUser")));
    }, [])

    useEffect(()=> {
        localStorage.setItem("currentUser", JSON.stringify(user))
    }, [user]);

    
    const auth = {
        user,
        login,
        logout,
        token
    }
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}