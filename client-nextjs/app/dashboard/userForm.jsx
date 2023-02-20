'use client'

import { useState } from "react"
import axios from "axios"

const baseUrl = 'http://localhost:8080/api/v1'

export default function UserForm () {

    const [userCredentials, setUserCredentials] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        rol: '',
        imagePath: ''
    })

    const handleChange = (e) => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(baseUrl + '/new/user', userCredentials)
        console.log(userCredentials)
    }

    return (
        <div className="form-box">
            <h1>User Form</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                name="username"
                placeholder="username"
                type="text"></input>

                <input
                onChange={handleChange}
                name="email"
                placeholder="email"
                type="email"></input>

                <input
                onChange={handleChange}
                name="password"
                placeholder="password"
                type="password"></input>

                <input
                onChange={handleChange}
                name="phoneNumber"
                placeholder="phone number"
                type="text"></input>

                <div>
                    <select id="rol-select" name="rol" onChange={handleChange}>
                        <option selected disabled>Rol</option>
                        <option value="User">User</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                    </select>   
                </div>
            
                <input
                onChange={handleChange}
                name="imagePath"
                type="file"></input>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}