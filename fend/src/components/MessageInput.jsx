import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { ImagePlus, SendHorizontal } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState('')
    const { sendMessage, currentChat } = useChat()

    const handleClick = () => {
        console.log(text)
        if (!text) return
        sendMessage({ text, receiverId: currentChat._id })
        setText('')
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-2 shadow-sm">

                <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <ImagePlus className="w-5 h-5 text-gray-600" />
                </button>

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && text.trim() !== "") {
                            handleClick();
                        }
                    }}
                    className="flex-1 outline-none px-2 text-gray-700 placeholder-gray-400 bg-transparent"
                />

                <button
                    onClick={handleClick}
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition"
                >
                    <SendHorizontal className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    )
}

export default MessageInput