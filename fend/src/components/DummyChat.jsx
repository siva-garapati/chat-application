import React from "react";
import { MessageSquare } from "lucide-react";

const DummyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 px-4">
      <MessageSquare className="w-12 h-12 mb-4 text-blue-500" />

      <h2 className="text-xl font-semibold text-gray-700">
        Select a chat to start messaging
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        Choose from your existing conversations, or start a new one.
      </p>

      <p className="mt-4 text-xs text-gray-400 italic">
        Tip: Use the search bar above to quickly find users or chats.
      </p>
    </div>
  );
};

export default DummyChat;