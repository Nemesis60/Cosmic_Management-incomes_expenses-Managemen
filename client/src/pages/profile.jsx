import useAuth from "../hooks/useAuth"
import { useParams } from 'react-router-dom'
import useAxios from "../hooks/useAxios"
import Loader from "../components/loader"
import { useState } from "react"
import moment from 'moment'
import useUpdate from "../hooks/useUpdate"
import ModalFormUserUpdate from "../components/modals/modalFormUserUpdate"

export default function Profile() {
    let { userId } = useParams()
    const [dataActive, setDataActive] = useState(true)
    const [openModal, setOpenModal] = useState(false)

    const { id } = useAuth()
    const { loading, response, error } = useAxios({
        method: 'GET',
        url: `users/${userId}`,
        headers: { accept: '*/*' }
    })

    const initialData = {
        imagePath: ''
    }
    const onValidate = (form) => {
        let errors = {}

        return errors
    }
    const { form, errors, handleChange, handleSubmit } = useUpdate(initialData, onValidate, `/users/${userId}`)

    const handleActive = () => {
        setDataActive(true)
    }

    return (
        <main className="profile-container">
            {loading
                ? <Loader />
                : <div>
                    <div className="profile">
                        {error && (
                            <div>
                                <p>{error.message}</p>
                            </div>
                        )}
                        <div className="profile-img">
                            <img src={response.user.imagePath} alt={response.user.username} />
                        </div>
                        <div className="profile-info">
                            <div className="profile-info-top">
                                <h3>{response?.user?.username}</h3>
                                {response?.user?._id === id
                                    ? <button className="profile-edit-btn"
                                    onClick={() => setOpenModal(true)}
                                    >Edit Profile</button>
                                    : <></>
                                }
                            </div>
                            <div className="profile-info-detail">
                                <p>{response?.user?.phoneNumber}</p>
                                <p>{response?.user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-data">
                        <div className="profile-sections">
                            <ul>
                                <li
                                    onClick={() => setDataActive(true)}
                                    className={`profile-select
                                ${dataActive === true ? 'selected' : ''}
                                `}
                                >Incomes</li>
                                <li
                                    onClick={() => setDataActive(false)}
                                    className={`profile-select
                                ${dataActive === false ? 'selected' : ''}
                                `}>Expenses</li>
                            </ul>
                        </div>
                        {dataActive
                            ? <div className="profile-table-container">
                                {response?.user?.incomes.length !== 0
                                    ? <table className="view-user-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Amount</th>
                                                <th>Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response?.user?.incomes
                                                .map((userIncome, i) => {
                                                    return (

                                                        <tr key={userIncome._id}>
                                                            <td>{(i + 1)}</td>
                                                            <td>{userIncome.inTitle}</td>
                                                            <td data="Amount">{userIncome.inAmount.toLocaleString('en-US')}</td>
                                                            <td data="created">{moment(userIncome.createdAt).format("Do MMM YYYY, h:mm:ss a")}</td>
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                    : <h1 className='table-message'>This User has not Uploaded Incomes</h1>
                                }
                            </div>
                            : <div className="profile-table-container">
                                {response?.user?.expenses.length !== 0
                                    ? <table className="view-user-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Amount</th>
                                                <th>Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response?.user?.expenses?.map((userExpense, i) => {
                                                return (
                                                    <tr key={userExpense._id}>
                                                        <td>{(i + 1)}</td>
                                                        <td>{userExpense.outTitle}</td>
                                                        <td data="Amount">{userExpense.outAmount.toLocaleString('en-US')}</td>
                                                        <td data="created">{moment(userExpense.createdAt).format("Do MMM YYYY, h:mm:ss a")}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    : <h1 className='table-message'>This User has not Uploaded Expenses</h1>
                                }
                            </div>
                        }
                    </div>
                </div>
            }
            <ModalFormUserUpdate open={openModal} onClose={() => setOpenModal(false)} user={response} />
        </main>
    )
}