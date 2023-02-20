'use client'

import axios from 'axios';
import {useState, useEffect} from 'react'

const baseUrl = 'http://localhost:8080/api/v1'

function Users() {
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        axios.get(baseUrl + '/users')
        .then(res => {
            setUsersData(res.data.users)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <main className='table'>
            <div className='table__header'>
                <h1>Users</h1>
            </div>
            <div className='table__body'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => {
                            return(
                                <tr key={user._id}>
                                    <td>Profile</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td><strong>{user.rol}</strong></td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Users;
