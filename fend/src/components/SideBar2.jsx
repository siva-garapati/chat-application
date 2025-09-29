import React from 'react'
import { useEffect } from 'react'
import { useChat } from '../context/ChatContext'

const SideBar2 = () => {
    const {users, getUsers, setCurrentChat} = useChat()

    useEffect(() => {
        getUsers()
    }, [])

    // console.log(users)
    
    return (
        <div className="w-full h-full overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Users</h2>
            <div className="space-y-2">
                {users.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => setCurrentChat(user)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer transition"
                    >
                        <img
                            src={`https://api.dicebear.com/9.x/bottts/svg?seed=${user._id}`}
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