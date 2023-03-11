import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import ModalUserForm from '../components/modals/modalUserForm'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import useTitle from '../hooks/useTitle'
import useAuth from '../hooks/useAuth'
import Loader from '../components/loader'
import Swal from 'sweetalert2'

function Users() {
    useTitle('Users | Cosmic Management')
    const [openModal, setOpenModal] = useState(false)
    const [search, setSearch] = useState('')

    const { rol } = useAuth()

    const { loading, response, error } = useAxios({
        method: 'GET',
        url: 'users',
        headers: { accept: '*/*' },
    })

    const deleteUser = async (id, rol) => {
        if (rol === 'Admin') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You can't delete Admins!",
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Yes, delete User`
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8080/api/v1/users/${id}`)
                    Swal.fire(
                        'Deleted!',
                        'User Was Deleted',
                        'success'
                    )
                }
            })
        }
    }

    return (
        <div className='table-users-container'>
            {rol !== 'Admin'
                ? <></>
                : <button onClick={() => setOpenModal(true)} >
                    New User
                </button>
            }
            <div className='top-table'>
                <h1>Users</h1>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div>
                    {error && (
                        <div>
                            <p>{error.message}</p>
                        </div>
                    )}
                    <div>
                        {response?.users?.length === 0
                            ? <h1 className='table-message'>There are no Users</h1>
                            :
                            <div>
                                <input type="text"
                                    className="table-search"
                                    placeholder='Search User...'
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                />
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Created</th>
                                            <th>Rol</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {response?.users
                                            .filter((user) => {
                                                return search.toLocaleLowerCase() === ''
                                                    ? user
                                                    : user.username.toLowerCase().includes(search)
                                            })
                                            .map((user, i) => (
                                                <tr key={user._id}>
                                                    <td>{(i + 1)}</td>
                                                    <td data="Username">{user.username}</td>
                                                    <td data="Email">{user.email}</td>
                                                    <td data="Phone">{user.phoneNumber}</td>
                                                    <td data="Created">{moment(user.createdAt).format("Do MMM YYYY, h:mm:ss a")}</td>
                                                    <td data="Rol">{user.rol}</td>
                                                    <td className='actions' data="Actions">
                                                        {rol !== 'Admin'
                                                            ? <></>
                                                            : <button onClick={() => deleteUser(user._id, user.rol)} className='delete-btn'>Delete</button>
                                                        }
                                                        <button className='detail-btn'>
                                                            <Link to={`/dashboard/${user._id}`}>View</Link>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            )}
            <ModalUserForm open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}

export default Users