import React from 'react'
import SideBar1 from '../components/SideBar1'
import SideBar2 from '../components/SideBar2'
import DummyChat from '../components/DummyChat';
import ChatBox from '../components/ChatBox';
import { useChat } from '../context/ChatContext';

const HomePage = () => {

    const {currentChat} = useChat();

    return (
        <div className="flex h-screen">
            <div className="w-42">
                <SideBar1 />
            </div>

            <div className="w-98 border-l border-r overflow-hidden">
                <SideBar2 />
            </div>

            <div className="flex-1">
                {!currentChat ? <DummyChat /> : <ChatBox />}
            </div>
        </div>
    )
}

export default HomePage