'use client'

import { useState } from "react"
import axios from "axios";
import { decode } from "jsonwebtoken";

const baseUrl = 'http://localhost:8080/api/v1'

export default function ExpenseForm () {
    const userStorage = localStorage.getItem("accessToken");
    const decoded = decode(userStorage)

    const [expenseCredentials, setExpenseCredentials] = useState({
        UserCreator: decoded.id,
        outTitle: '',
        outAmount: 0,
        outDescription: ''
    })

    const handleChange = (e) => {
        setExpenseCredentials({
            ...expenseCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(baseUrl + '/new/expense', expenseCredentials)
        // console.log(incomeCredentials)
    }

    return (
        <div className="form-box">
            <h1>Expense Form</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                name="outTitle"
                placeholder="Title"
                type="text"></input>

                <input
                onChange={handleChange}
                name="outAmount"
                placeholder="Amount"
                type="number"></input>
                
                <textarea
                onChange={handleChange}
                name="outDescription"
                cols="30" rows="10"
                placeholder="Description"
                ></textarea>
                
                <button type="submit">Send</button>
            </form>
        </div>
    )
}