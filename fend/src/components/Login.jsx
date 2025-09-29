import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [loginForm, setLoginForm] = useState({ 'username': '', 'email': '', 'password': '' })

    const { login, status } = useAuth()

    const handleClick = async () => {
        login(loginForm)
    }
    return (
        <div>
            <input
                type="text"
                placeholder='email'
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, 'email': e.target.value })}
            />
            <input
                type="password"
                placeholder='Password'
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, 'password': e.target.value })}
            />
            <button onClick={handleClick}>
                {status.isLoggingIn ? 'logging in....' : 'Login'}
            </button>
        </div>
    )
}

export default Login