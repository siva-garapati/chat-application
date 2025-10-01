import React, { useState } from 'react'
import { useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { Search } from "lucide-react";

const SideBar2 = ({ className }) => {
    console.log(className)
    const { users, getUsers, setCurrentChat, currentChat } = useChat()
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getUsers()
    }, [])

    console.log(users, currentChat)

    return (
        <div className={`w-full h-full flex flex-col ${className || ""} border-r border-[hsl(220,13%,91%)] bg-white`}>
            <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center">
                {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
                <h1 className="text-lg font-bold text-gray-800 tracking-tight">ChatBox</h1>
            </div>

            {/* Search Bar */}
            <div className="px-3 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-3 py-3 rounded-md bg-gray-100 text-sm text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 px-3 pb-3">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors
        ${filter === "all"
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("online")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors
        ${filter === "online"
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                >
                    Online
                </button>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto space-y-1 pb-2">
                {users.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => setCurrentChat(user)}
                        className={`cursor-pointer px-4 py-3 flex items-center gap-3 transition-colors
          ${currentChat?._id === user._id
                                ? "bg-blue-50 border-r-4 border-blue-400"
                                : "hover:bg-gray-100"
                            }`}
                    >
                        <img
                            src={`https://api.dicebear.com/9.x/bottts/svg?seed=${user.username}`}
                            alt="avatar"
                            className="w-9 h-9 rounded-full"
                        />
                        <span className="text-gray-800 font-medium truncate">
                            {user.username}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar2