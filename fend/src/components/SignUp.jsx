import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SignUp = () => {
    const [signUpForm, setSignUpForm] = useState({ 'username': '', 'email': '', 'password': '' })

    const { signup, status } = useAuth()

    const handleClick = async () => {
        signup(signUpForm)
    }
    return (
        <div>
            <input
                type="text"
                placeholder='Username'
                value={signUpForm.username}
                onChange={(e) => setSignUpForm({ ...signUpForm, 'username': e.target.value })}
            />
            <input
                type="text"
                placeholder='email'
                value={signUpForm.email}
                onChange={(e) => setSignUpForm({ ...signUpForm, 'email': e.target.value })}
            />
            <input
                type="password"
                placeholder='Password'
                value={signUpForm.password}
                onChange={(e) => setSignUpForm({ ...signUpForm, 'password': e.target.value })}
            />
            <button onClick={handleClick}>
                {status.isUp ? 'Signing Up...' : 'Sign Up'}
            </button>
        </div>
    )
}

export default SignUp