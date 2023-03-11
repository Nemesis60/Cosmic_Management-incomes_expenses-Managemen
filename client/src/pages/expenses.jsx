import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import ModalExpenseForm from '../components/modals/modalExpenseForm'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import Loader from '../components/loader'
import useTitle from '../hooks/useTitle'
import Swal from 'sweetalert2'

function Expenses() {
    useTitle('Expenses | Cosmic Management')
    const [openModal, setOpenModal] = useState(false)
    const [search, setSearch] = useState('')

    const { loading, response, error } = useAxios({
        method: 'GET',
        url: 'expenses',
        headers: { accept: '*/*' },
    })

    const deleteExpense = async (id, title) => {
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
                axios.delete(`http://localhost:8080/api/v1/expenses/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Expense was Deleted',
                    'success'
                )
            }
        })
    }

    return (
        <div className='table-container'>
            <button onClick={() => setOpenModal(true)} >
                New Expense
            </button>
            <div className='top-table'>
                <h1>Expenses</h1>
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
                    {response?.expenses?.length === 0
                        ? <h1 className='table-message'>There are no Expenses</h1>
                        : <div>
                            <input type="text"
                                className="table-search"
                                placeholder='Search Expense...'
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
                                    {response?.expenses
                                        .filter((expense) => {
                                            return search.toLocaleLowerCase() === ''
                                                ? expense
                                                : expense.outTitle.toLowerCase().includes(search)
                                        })
                                        .map((expense, i) => (
                                            <tr key={expense._id}>
                                                <td>{(i + 1)}</td>
                                                <td data="Title">{expense.outTitle}</td>
                                                <td data="Amount">{expense.outAmount.toLocaleString('en-US')}</td>
                                                <td data="Created">{moment(expense.createdAt).format("Do MMM YYYY, h:mm:ss a")}</td>
                                                <td data="Creator">{expense.UserCreator.username}</td>
                                                <td className='actions' data="Actions">
                                                    <button onClick={() => deleteExpense(expense._id, expense.outTitle)} className='delete-btn'>Delete</button>
                                                    <button className='detail-btn'>
                                                        <Link to={`/dashboard/expenses/${expense._id}`}>View</Link>
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
            <ModalExpenseForm open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}

export default Expenses