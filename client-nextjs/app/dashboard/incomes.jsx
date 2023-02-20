'use client'

import axios from 'axios';
import {useState, useEffect} from 'react'

const baseUrl = 'http://localhost:8080/api/v1'

function Incomes() {
    const [incomesData, setIncomesData] = useState([])

    useEffect(() => {
        axios.get(baseUrl + '/incomes')
        .then(res => {
            setIncomesData(res.data.incomes)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <main className='table'>
            <div className='table__header'>
                <h1>Incomes</h1>
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
                        {incomesData.map((income) => {
                            return(
                                <tr key={income._id}>
                                    <td className='actions-td'>
                                        <button className='detail-btn'>Detail</button>
                                        <button className='update-btn'>Update</button>
                                        <button className='delete-btn'>Delete</button>
                                    </td>
                                    <td>{income.UserCreator.username}</td>
                                    <td>{income.inTitle}</td>
                                    <td>{income.inAmount}</td>
                                    <td>{income.createdAt}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Incomes;
