'use client'
import { useState } from "react"
import axios from "axios";
import { decode } from "jsonwebtoken";

const baseUrl = 'http://localhost:8080/api/v1'

export default function IncomeForm () {
    const userStorage = localStorage.getItem("accessToken");
    const decoded = decode(userStorage)

    const [incomeCredentials, setIncomeCredentials] = useState({
        UserCreator: decoded.id,
        inTitle: '',
        inAmount: 0,
        inDescription: ''
    })

    const handleChange = (e) => {
        setIncomeCredentials({
            ...incomeCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(baseUrl + '/new/income', incomeCredentials)
        // console.log(incomeCredentials)
    }

    return (
        <div className="form-box">
            <h1>Income Form</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                name="inTitle"
                placeholder="Title"
                type="text"></input>

                <input
                onChange={handleChange}
                name="inAmount"
                placeholder="Amount"
                type="number"></input>
                
                <textarea
                onChange={handleChange}
                name="inDescription"
                cols="30" rows="10"
                placeholder="Description"
                ></textarea>
                
                <button type="submit">Send</button>
            </form>
        </div>
    )
}