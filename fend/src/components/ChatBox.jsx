import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import MessageInput from './MessageInput'
import { useAuth } from '../context/AuthContext'
import ChatBoxHead from './ChatBoxHead'

const ChatBox = () => {

  const {
    messages,
    getMessages,
    currentChat,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChat()

  const {authUser} = useAuth()
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(currentChat._id)
    subscribeToMessages()

    return ()=> unsubscribeFromMessages()
  }, [currentChat])

  // useEffect(() => {
  //   if (messageEndRef.current && messages) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);
  useLayoutEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  // const formatTime = (dateString) => {
  //   const date = new Date(dateString)
  //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  // }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }

  return (
    <div className="flex flex-col h-full flex-1 pb-16 md:pb-0 bg-gray-50">
      <ChatBoxHead/>

      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 custom-scrollbar">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}
              // ref={messageEndRef}
            >
              <div
                className={`px-3 py-2 rounded-2xl
            ${message.senderId === authUser._id
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }
            min-w-[60px] max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
          `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words break-all">
                  {message.text}
                </p>
              </div>

              {/* timestamp */}
              <span
                className={`mt-1 text-[11px] text-gray-500 ${message.senderId === authUser._id ? "text-right pr-1" : "text-left pl-1"
                  }`}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>


      <div className=" p-3 bg-white
                fixed bottom-0 left-0 w-full sm:sticky sm:bottom-0 sm:w-auto">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatBox