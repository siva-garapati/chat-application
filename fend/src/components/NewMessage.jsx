import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export default function NewMessage() {
    const navigate = useNavigate();
    const { filteredUsers, searchUsers } = useAuth();
    const {setCurrentChat} = useChat();
    const [query, setQuery] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchUsers(query);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleClose = () => navigate(-1);

    const handleUserClick = (user) => {
        setCurrentChat(user);
        navigate(-1);
    };

    return (
        <div
            className={`fixed inset-0 z-50 ${isMobile
                ? "bg-white"
                : "bg-black/40 flex justify-center items-center"
                }`}
        >
            <div
                className={`${isMobile
                    ? "w-full h-full flex flex-col"
                    : "bg-white rounded-2xl shadow-lg w-[400px] max-h-[80vh] flex flex-col"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">New Message</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-black cursor-pointer transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-4 border-b">
                    <input
                        type="text"
                        placeholder="Search users"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                    />
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filteredUsers?.length ? (
                        filteredUsers.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => handleUserClick(user)}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                            >
                                {/* Dummy Profile */}
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>

                                {/* User Info */}
                                <div className="flex flex-col">
                                    <span className="font-medium">{user.name || user.username}</span>
                                    <span className="text-gray-500 text-sm">@{user.username}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center mt-4">
                            No users found
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}