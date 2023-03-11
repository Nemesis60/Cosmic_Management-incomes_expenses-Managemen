import { useState } from "react";
import { useParams, Link } from "react-router-dom"
import Loader from "../components/loader";
import useAxios from "../hooks/useAxios";
import ExpenseUpdate from "../components/formUpdate/expenseUpdate";

export default function ViewExpense() {
    const [clickUpdate, setClickUpdate] = useState(false)
    let { expenseId } = useParams()

    const { loading, response, error } = useAxios({
        method: 'GET',
        url: `expenses/${expenseId}`,
        headers: { accept: '*/*' }
    })

    const handleClick = () => {
        setClickUpdate(!clickUpdate)
    }

    return (
        <main className="view-container">
            {loading
                ? <Loader />
                : <div className="view-content-container">
                    {error && (
                        <div>
                            <p>{error.message}</p>
                        </div>
                    )}
                    {clickUpdate
                        ? <ExpenseUpdate response={response} id={expenseId} user={response?.expense?.UserCreator?._id} />
                        : <div className="view-content">
                            <h2>{response?.expense?.outTitle}</h2>
                            <div className="view-content-detail">
                                <p className="view-content-amount"><span className="amount-text">Amount:</span> {response?.expense?.outAmount}</p>
                                <div className="view-content-desc">
                                    <h3>Description</h3>
                                    <p>{response?.expense?.outDescription}</p>
                                </div>
                            </div>
                        </div>
                    }
                    <p className="view-user">User: <Link className="view-user-link" to="">{response?.expense?.UserCreator?.username}</Link></p>
                    <div className="view-btn-actions">
                        <Link to="/dashboard/expenses">
                            <button>Expenses</button>
                        </Link>
                        <button onClick={handleClick}>
                            {clickUpdate ? 'Back' : 'Update Expense'}
                        </button>
                    </div>
                </div>
            }
        </main>
    )
}