'use client'

import axios from 'axios';
import {useState, useEffect} from 'react'

const baseUrl = 'http://localhost:8080/api/v1'

function Expenses() {
    const [expensesData, setExpensesData] = useState([])

    useEffect(() => {
        axios.get(baseUrl + '/expenses')
        .then(res => {
            setExpensesData(res.data.expenses)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <main className='table'>
            <div className='table__header'>
                <h1>Expenses</h1>
            </div>
            <div className='table__body'>
                <table>
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>User</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensesData.map((expense) => {
                            return(
                                <tr key={expense._id}>
                                    <td className='actions-td'>
                                        <button className='detail-btn'>Detail</button>
                                        <button className='update-btn'>Update</button>
                                        <button className='delete-btn'>Delete</button>
                                    </td>
                                    <td>{expense.UserCreator.username}</td>
                                    <td>{expense.outTitle}</td>
                                    <td>{expense.outAmount}</td>
                                    <td>{expense.createdAt}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Expenses;