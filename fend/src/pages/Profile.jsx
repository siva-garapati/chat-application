import React from 'react';
import { useAuth } from '../context/AuthContext';

// Inline SVG for User/Profile Icon
const UserIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4.29-3.09 6-3.09s5.97 1.1 6 3.09c-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
);

const Profile = () => {
    // Dummy user data
    const {authUser: user} = useAuth();

    console.log(user)
    

    return (
        <>
            {/* 1. Left Panel: Profile Title/Icon (Monochrome) */}
            <div className='
                w-full md:w-76 lg:w-94 flex-shrink-0 
                border-r border-gray-300 
                bg-white p-6 h-full
                hidden md:flex
            '>

                {/* Simple Profile Header: Icon and Title only */}
                <header className="pt-4">
                    <div className="flex items-center space-x-3 text-gray-900">
                        <UserIcon className="w-8 h-8" />
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            Profile
                        </h1>
                    </div>
                </header>

            </div>

            {/* 2. Right Panel: Main Profile Details (Centered and Monochrome) */}
            <div className="flex-1 overflow-y-auto p-8 pb-22 bg-gray-50 h-full flex flex-col items-center">

                {/* Content wrapper to maintain max width while centering */}
                <div className="w-full max-w-xl">

                    {/* Panel 2 Content: Main Profile Details */}
                    <h2 className="text-2xl font-bold md:text-3xl md:font-extrabold text-gray-900 mb-8 border-b border-gray-300 pb-3 text-center">
                        Your Account Profile
                    </h2>

                    {/*Photo and Edit Button*/}
                    <div className="flex flex-col items-center mb-10 p-6 bg-white rounded-xl border border-gray-100">
                        <img
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-100"
                            src= {`https://api.dicebear.com/9.x/bottts/svg?seed=${user.username}`}
                        />
                        <button className="hover:bg-gray-100 cursor-pointer transition-colors px-5 py-2 mt-6 rounded-full font-semibold text-sm border-1 border-gray-300 text-gray-700">
                            Edit Profile
                        </button>
                    </div>

                    <div className="flex flex-col justify-between space-y-6 p-6 bg-white rounded-xl border border-gray-100">

                        {/* Name */}
                        {/* <div className="border-b border-gray-200 pb-3">
                            <span className="text-xs font-medium uppercase text-gray-500 block mb-1">Full Name</span>
                            <h3 className="text-xl font-bold text-gray-900">{user.username}</h3>
                        </div> */}

                        {/* Username */}
                        <div className="border-b border-gray-200 pb-3">
                            <span className="text-xs font-medium uppercase text-gray-500 block mb-1">Username</span>
                            <p className="text-lg text-gray-700">@{user.username}</p>
                        </div>

                        {/* Email */}
                        <div className="border-gray-200">
                            <span className="text-xs font-medium uppercase text-gray-500 block mb-1">Email Address</span>
                            <p className="text-lg text-gray-700 font-medium break-all">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile