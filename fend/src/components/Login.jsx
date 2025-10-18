import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'
import { Link } from 'react-router-dom'

const Login = () => {
    const [loginForm, setLoginForm] = useState({'email': '', 'password': '' })

    const { login, status } = useAuth()

    const isFormEmpty = !loginForm.email || !loginForm.password;

    const isDisabled = status.isLoggingIn || isFormEmpty;

    const handleClick = async () => {
        login(loginForm)
    }
    return (
        <div className="bg-white p-0 rounded-xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-black mb-8">Log in to your account</h2>

            <div className="space-y-6">
                <input
                    type="text"
                    placeholder='Enter your Email'
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, 'email': e.target.value })}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg text-black 
                               focus:ring-1 focus:outline-none placeholder-gray-500'
                />
                <input
                    type="password"
                    placeholder='Enter your Password'
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, 'password': e.target.value })}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg text-black 
                               focus:ring-1 focus:outline-none placeholder-gray-500'
                />
                <button
                    onClick={handleClick}
                    disabled={isDisabled}
                    className={`w-full py-3 mt-4 font-bold rounded-full text-white flex items-center justify-center
                                ${isDisabled
                            ? "bg-gray-400 cursor-not-allowed opacity-80"
                        : "bg-[rgb(29,155,240)] hover:bg-[rgb(26,140,216)] focus:outline-none cursor-pointer"
                        }`}
                >
                    {status.isLoggingIn ? (
                        <>
                            <LoadingSpinner />
                            <span className='ml-2'>Logging in...</span>
                        </>
                    ) : 'Login'}
                </button>
            </div>
            <p className="mt-8 text-sm text-gray-500 text-center">
                Don't have an account?{" "}
                <Link to="/auth/signup"
                   className="text-[rgb(29,155,240)] font-semibold hover:text-[rgb(26,140,216)] hover:underline transition duration-150"
                >
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login