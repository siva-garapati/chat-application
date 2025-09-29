import React, { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import MessageInput from './MessageInput'
import { useAuth } from '../context/AuthContext'

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

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
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
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 font-semibold text-gray-800">
        {currentChat.username}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pl-8 pr-8 space-y-4">
        {messages.map((message) => {

          return (
            <div
              key={message._id}
              className={`flex flex-col ${message.senderId === authUser._id ? 'items-end' : 'items-start'}`}ref={messageEndRef}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-2xl ${message.senderId === authUser._id
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <span className="text-[11px] text-gray-500 mt-1">
                {formatTime(message.createdAt)}
              </span>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="border-t border-gray-300 p-3">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatBox