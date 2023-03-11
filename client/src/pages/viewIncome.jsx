import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import IncomeUpdate from "../components/formUpdate/incomeUpdate";
import Loader from "../components/loader";
import useAxios from "../hooks/useAxios";

export default function ViewIncome() {
    const [clickUpdate, setClickUpdate] = useState(false)
    let { incomeId } = useParams()

    const { loading, response, error } = useAxios({
        method: 'GET',
        url: `incomes/${incomeId}`,
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
                        ? <IncomeUpdate response={response} id={incomeId} user={response.income.UserCreator._id} />
                        : <div className="view-content">
                            <h2>{response?.income?.inTitle}</h2>
                            <div className="view-content-detail">
                                <p className="view-content-amount"><span className="amount-text">Amount:</span> {response?.income?.inAmount}</p>
                                <div className="view-content-desc">
                                    <h3>Description</h3>
                                    <p>{response?.income?.inDescription}</p>
                                </div>
                            </div>
                        </div>
                    }
                    <p className="view-user">User: <Link className="view-user-link" to="">{response?.income?.UserCreator?.username}</Link></p>
                    <div className="view-btn-actions">
                        <Link to="/dashboard/incomes">
                            <button>Incomes</button>
                        </Link>
                        <button onClick={handleClick}>
                            {clickUpdate ? 'Back' : 'Update Income'}
                        </button>
                    </div>
                </div>
            }
        </main>
    )
}