import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'
import useTitle from '../hooks/useTitle'
import Loader from '../components/loader'
import Swal from 'sweetalert2'
import useForm from '../hooks/useForm'

function FeedBack() {
    useTitle('Feedback | Cosmic Management')
    const { id, image, username } = useAuth()

    const { loading, response, error } = useAxios({
        method: 'GET',
        url: 'feedbacks',
        headers: { accept: '*/*' }
    })

    const navigate = useNavigate()

    const initialData = {
        User: id,
        feedback: ''
    }

    const onValidate = (form) => {
        let errors = {}

        if (!form.feedback.trim()) {
            errors.feedback = 'Please fill this input'
        }

        return errors
    }

    const { form, errors, handleChange, handleSubmit } = useForm(initialData, onValidate, 'feedbacks',
        'Feedback was Created'
    )


    const deleteFeedback = async (id) => {
        /* const isDelete = window.confirm(`Are you sure?`) */
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
                axios.delete(`http://localhost:8080/api/v1/feedbacks/${id}`)
                Swal.fire(
                    'Deleted!',
                    'Your feedback has been deleted.',
                    'success'
                )
                setTimeout(() => {
                    navigate(0)
                }, 2000)
            }
        })
    }

    return (
        <main className='feedback-container'>
            <div className='feedback-top'>
                <Link to={`/dashboard/${id}`}>
                    <img src={image} alt={username} />
                </Link>
                <form className='feedback-top-bottom' onSubmit={handleSubmit} >
                    <textarea name="feedback" cols="30" rows="10"
                        placeholder='Your opinion is very important'
                        onChange={handleChange}
                        value={form.feedback}
                    ></textarea>
                    <button type='submit' className='feedback-send'>Send</button>
                </form>
            </div>
            <div className='feedbacks-display'>
                {loading
                    ? <Loader />
                    : <div>
                        {error && (
                            <div>
                                <p>{error.message}</p>
                            </div>
                        )}
                        {response?.feedbacks?.map((feedback) => {
                            return (
                                <div className='feedback' key={feedback?._id}>
                                    <div className='feedback-img'>
                                        <Link to={`/dashboard/${feedback?.User?._id}`}>
                                            <img src={feedback?.User.imagePath} alt={feedback?.User?.username} />
                                        </Link>
                                    </div>
                                    <div className='feedback-detail'>
                                        <p className='feedback-username'>{feedback?.User.username}</p>
                                        <p className='feedback-text'>{feedback?.feedback}</p>

                                        {feedback?.User?._id === id
                                            ? <div className='feedback-actions'>
                                                <p onClick={() => deleteFeedback(feedback?._id)}>Delete</p>
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </main>
    )
}

export default FeedBack
