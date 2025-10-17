import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { ImagePlus, Send } from 'lucide-react';

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
        <div className='w-full p-2 bg-gray-50'>
            <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-1 md:px-3 py-1 sm:py-2 overflow-hidden">

                <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
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
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />

                <button
                    onClick={handleClick}
                    disabled={!text.trim()}
                    type="button"

                    className={`p-2 rounded-full transition ${!text.trim() ? 'opacity-50' : 'cursor-pointer'}`}
                >
                    <Send className="w-5 h-5 text-[rgb(29,155,240)]" />
                </button>
            </div>
        </div>
    )
}

export default MessageInput