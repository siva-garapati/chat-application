import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MessagesSquare,
  MailPlus,
  ShuffleIcon,
  LogOutIcon,
  User,
} from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const SideBar1 = () => {
  const [active, setActive] = useState("chat");
  const location = useLocation();
  const {currentChat} = useChat();
  const { logout } = useAuth();

  const icons = [
    { id: "chat", icon: MessagesSquare, title: "Chat", path: "/" },
    { id: "new", icon: MailPlus, title: "New Message", path: "/new-message" },
    { id: "shuffle", icon: ShuffleIcon, title: "Random Chat", path: "/random-chat" },
    { id: "contacts", icon: User, title: "Profile", path: "/profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:w-20 lg:w-28 md:flex md:flex-col w-30 bg-white border-r border-gray-200 pt-6">
        <div className="flex-1 flex flex-col items-end gap-4 py-6 pr-3">
          {icons.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.path}
                title={item.title}
                className={`p-3 rounded-xl transition-all duration-200 
                  ${location.pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            );
          })}
        </div>

        {/* Logout at bottom */}
        <div className="flex justify-end pr-3 pb-6">
          <div
            title="Logout"
            className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-red-50 text-red-500 cursor-pointer transition"
            onClick={logout}
          >
            <LogOutIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {!currentChat && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-sm p-2 flex justify-around">
          {icons.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex flex-col items-center justify-center p-2 transition-colors 
                ${active === item.id ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
              >
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.title}</span>
              </button>
            );
          })}
        </div> 
      )}
    </>
  );
};

export default SideBar1;