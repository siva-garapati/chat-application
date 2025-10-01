import React from 'react'
import SideBar1 from '../components/SideBar1'
import SideBar2 from '../components/SideBar2'
import DummyChat from '../components/DummyChat';
import ChatBox from '../components/ChatBox';
import { useChat } from '../context/ChatContext';

const HomePage = () => {

    const { currentChat } = useChat();

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <SideBar1 />

            <SideBar2 className={`w-full md:w-76 lg:w-94  flex-shrink-0 ${currentChat ? 'hidden md:flex' : ''} `} />

            <div className="flex-1">
                {!currentChat ? <DummyChat /> : <ChatBox />}
            </div>
        </div>
    )
}

export default HomePage