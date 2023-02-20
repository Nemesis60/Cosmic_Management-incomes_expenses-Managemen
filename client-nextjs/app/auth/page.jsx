'use client'

import axios from "axios";
import { useState } from "react";
import Router from 'next/router';

const baseUrl = 'http://localhost:8080/api/v1';

function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(baseUrl + '/login', credentials)
        localStorage.setItem('accessToken', response.data.token)
        Router.push('/dashboard')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                name="email"
                placeholder="email pls"
                type="email"></input>

                <input
                onChange={handleChange}
                name="password"
                placeholder="password pls"
                type="password"></input>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Login