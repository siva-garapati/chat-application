import { createContext, useContext, useState } from "react";
import api from "../libs/api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const ChatContext = createContext(null);

export const ChatProvider = ({children}) => {

    const [users, setUsers] = useState([]);
    // const [showSearchModal, setShowSearchModal] = useState(false)
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({
        isLoadingUsers: false,
        isLoadingMessages: false,
    });

    const {socket} = useAuth()

    const getUsers = async () => {
        setStatus(prev => ({...prev, isLoadingUsers: true}));
        try{
            const res = await api.get('/messages/users')
            
            setUsers(res.data.users);
        }
        catch(err){
            toast.error(err?.response?.data?.message || err.message)
        }
        finally{
            setStatus(prev => ({...prev, isLoadingUsers: false}));
        }
    }

    const getMessages = async (userId) =>{
        setStatus(prev => ({...prev, isLoadingMessages: true}));
        try{
            const res = await api.get(`/messages/get/${userId}`)

            console.log(res.data)

            setMessages(res.data);
        }
        catch(err){
            toast.error(err?.response?.data?.message || err.message)
        }
        finally{
            setStatus(prev => ({...prev, isLoadingMessages: false}));
        }
    }

    const sendMessage = async(messageDate)=>{
        try{
            const res = await api.post('/messages/send',messageDate)
            setMessages(prev => ([...prev, res.data]) )
        }
        catch(err){
            toast.error(err?.response?.data?.message || err.message)
        }
    }

    const subscribeToMessages = ()=>{
        if(!currentChat) return;

        socket.on('newMessage', (newMessage)=>{

            console.log(newMessage)
            const currentChatMessage = newMessage.senderId === currentChat._id;

            if (!currentChatMessage) return

            setMessages(prev => ([...prev, newMessage]) )
        })
    }

    const unsubscribeFromMessages = () => {
        socket.off("newMessage");
    }

    return(
        <ChatContext.Provider value={{
            users,
            currentChat, setCurrentChat,
            getUsers,
            status,
            messages, getMessages,
            sendMessage,
            subscribeToMessages, unsubscribeFromMessages
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)