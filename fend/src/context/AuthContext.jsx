import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

import api from "../libs/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [status, setStatus] = useState({
        isSigningUp: false,
        isLoggingIn: false,
        isCheckingAuth: true
    });
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [socket, setSocket] = useState(null)

    const signup = async (data) => {
        setStatus(prev => ({ ...prev, isSigningUp: true }))

        try {
            const res = await api.post('/auth/register', data)
            setAuthUser(res.data);
            console.log(res.data)
            toast.success("Account created successfully!")

            connectSocket();
        } catch (err) {
            console.log(err.message)
            toast.error(err?.response?.data?.message || err.message)
        } finally {
            setStatus(prev => ({ ...prev, isSigningUp: false }));
        }
    }

    const login = async (data) => {
        setStatus(prev => ({ ...prev, isLoggingIn: true }))

        try {
            const res = await api.post('/auth/login', data)
            setAuthUser(res.data);
            console.log(res.data)
            toast.success("login successful!")

            connectSocket(res.data._id)
        } catch (err) {
            console.log(err.message)
            toast.error(err?.response?.data?.message || err.message)
        } finally {
            setStatus(prev => ({ ...prev, isLoggingIn: false }));
        }
    }

    const checkAuth = async () => {
        setStatus(prev => ({ ...prev, isCheckingAuth: true }))
        try {
            const res = await api.get('/auth/check')
            setAuthUser(res.data);
            console.log(res.data)

            connectSocket(res.data._id)
        } catch (err) {
            console.log(err.message)
            setAuthUser(null);
        }
        setStatus(prev => ({ ...prev, isCheckingAuth: false }));
    }

    const logout = async()=>{
        try{
            await api.post('/auth/logout')
            setAuthUser(null);
            toast.success("Logged out successfully!")
        }catch (err) {
            console.log(err.message)
            toast.error(err?.response?.data?.message || err.message)
        }
    }

    const searchUsers = async(query)=>{
        try{
            if (query.trim() === '') {
                setFilteredUsers([]);
                return;
            }
            const res = await api.get(`/auth/searchusers?query=${query}`)
            setFilteredUsers(res.data)
            console.log(res.data)
        }catch(err){
            console.log("Error in searchUsers", err.message);
            toast.error(err?.response?.data?.message || err.message)
        }
    }

    const connectSocket = (userId) =>{
        console.log(userId)
        const socket = io('http://localhost:5000',{
            query:{
                userId
            }
        })

        socket.connect();

        setSocket(socket)

        // socket.on('getOnlineUsers',(users)=>{

        // })
    }

    const disConnectSocket = () =>{
        if (socket?.connected) socket.disconnect();
    }

    return (
        <AuthContext.Provider
            value={{
                authUser, setAuthUser,
                status, setStatus,
                signup, login,
                checkAuth, socket,
                connectSocket, disConnectSocket,
                logout, searchUsers, filteredUsers
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)