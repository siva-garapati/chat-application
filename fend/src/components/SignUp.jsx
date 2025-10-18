import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const SignUp = () => {
    const [signUpForm, setSignUpForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { signup, status } = useAuth();

    const isFormEmpty = !signUpForm.username || !signUpForm.email || !signUpForm.password;

    const isDisabled = status.isSigningUp || isFormEmpty;

    const handleClick = async () => {
        signup(signUpForm);
    };

    return (
        <div className="bg-white p-0 rounded-xl w-full">
            <h2 className="text-2xl font-bold text-black mb-8">Create your account</h2>

            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Enter your Name"
                    value={signUpForm.username}
                    onChange={(e) =>
                        setSignUpForm({ ...signUpForm, username: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black 
                               focus:ring-1 focus:outline-none placeholder-gray-500"
                />
                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={signUpForm.email}
                    onChange={(e) =>
                        setSignUpForm({ ...signUpForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black 
                               focus:ring-1 focus:outline-none placeholder-gray-500"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={signUpForm.password}
                    onChange={(e) =>
                        setSignUpForm({ ...signUpForm, password: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black 
                               focus:ring-1 focus:outline-none placeholder-gray-500"
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
                    {status.isSigningUp ? (
                        <>
                            <LoadingSpinner />
                            <span className='ml-2'>Signing Up...</span>
                        </>
                    ) : 'Sign Up'}
                </button>
            </div>

            <p className="mt-8 text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link to="/auth/login"
                    className="text-[rgb(29,155,240)] font-semibold hover:text-[rgb(26,140,216)] hover:underline transition duration-150"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
