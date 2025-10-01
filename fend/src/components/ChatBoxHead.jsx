import React from "react";
import { useChat } from "../context/ChatContext";
import { ArrowLeft, MoreVertical } from "lucide-react";

const ChatBoxHead = () => {
  const { currentChat, setCurrentChat } = useChat();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-2 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        {/* Back arrow on mobile */}
        <button
          onClick={() => setCurrentChat(null)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <img
          src={`https://api.dicebear.com/9.x/bottts/svg?seed=${currentChat.username}`}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-base md:text-lg truncate">
            {currentChat?.username || "Chat"}
          </span>
          {/* status online / next */}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatBoxHead;