import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import ModalIncome from '../components/modals/modalIncomeForm'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import Loader from '../components/loader'
import useTitle from '../hooks/useTitle'
import Swal from 'sweetalert2'

function Incomes() {
    useTitle('Incomes | Cosmic Management')
    const [openModal, setOpenModal] = useState(false)
    const [search, setSearch] = useState('')

    const { loading, response, error } = useAxios({
        method: 'GET',
        url: 'incomes',
        headers: { accept: '*/*' }
    })

    const deleteIncome = async (id, title) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/v1/incomes/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Income was Deleted',
                    'success'
                )
            }
        })
    }

    return (
        <div className='table-container'>
            <button onClick={() => setOpenModal(true)} >
                New Income
            </button>
            <div className='top-table'>
                <h1>Incomes</h1>
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
                    {response?.incomes?.length === 0
                        ? <h1 className='table-message'>There are no Incomes</h1>
                        : <div>
                            <input type="text"
                                className="table-search"
                                placeholder='Search Income...'
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            />
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Created</th>
                                        <th>Creator</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response.incomes
                                        .filter((income) => {
                                            return search.toLocaleLowerCase() === ''
                                                ? income
                                                : income.inTitle.toLowerCase().includes(search)
                                        })
                                        .map((income, i) => (
                                            <tr key={income._id}>
                                                <td>{(i + 1)}</td>
                                                <td data="Title">{income.inTitle}</td>
                                                <td data="Amount">{income.inAmount.toLocaleString('en-US')}</td>
                                                <td data="created">{moment(income.createdAt).format("Do MMM YYYY, h:mm:ss a")}</td>
                                                <td data="Creator">{income?.UserCreator?.username}</td>
                                                <td className='actions' data="Actions">
                                                    <button onClick={() => deleteIncome(income._id, income.inTitle)} className='delete-btn'>Delete</button>
                                                    <button className='detail-btn'>
                                                        <Link to={`/dashboard/incomes/${income._id}`}>View</Link>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            )}
            <ModalIncome open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}

export default Incomes
