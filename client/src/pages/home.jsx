import { Link, useNavigate } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import useForm from "../hooks/useForm"
import useAuth from '../hooks/useAuth'

function Home() {
    useTitle('Cosmic Management')
    const navigate = useNavigate()

    const { id } = useAuth()

    const initialData = {
        email: '',
        password: ''
    }

    const onValidate = (form) => {
        let errors = {}
        let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!form.email.trim()) {
            errors.email = '"Email" input is empty, please fill with your credentials'
        } else if (!regexEmail.test(form.email)) {
            errors.email = '"Email" is not valid'
        }
        if (!form.password.trim()) {
            errors.password = '"Password" input is empty, please fill with your credentials'
        }

        return errors
    }

    const { form, response, errors, handleChange, handleSubmit } = useForm(initialData, onValidate, 'auth/login', '', 'users')

    const logout = () => {
        localStorage.removeItem('accessToken')
        navigate(0)
    }

    return (
        <main className="home-container">
            <div className="home">
                <div className="home-content">
                    <h1>Welcome to Cosmic Management</h1>
                    <p className="home-content-text">In this platform you can keep track to incomes and expenses personal, for your family or company</p>
                </div>

                <div className="login-container">
                    {id
                        ? <div className='logged'>
                            <h3>Your loggedIn</h3>
                            <div className='logged-btn'>
                                <Link to='/dashboard/users'>
                                    <button>Go Dashboard</button>
                                </Link>
                                <button onClick={logout} >Logout</button>
                            </div>
                        </div>
                        : <div>
                            <h3>Let's Start to Manage your Life</h3>
                            <form className="login" onSubmit={handleSubmit} autoComplete="off" >
                                <div className="login-input">
                                    <input type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                    {errors.email && <p className="input-error">{errors.email}</p>}
                                    {response === 401 && <p className="input-error">Incorrect Email or Password</p>}
                                </div>
                                <div className="login-input">
                                    <input type="password"
                                        onChange={handleChange}
                                        name="password"
                                        value={form.password}
                                        placeholder="Password"
                                    />
                                    {errors.password && <p className="input-error">{errors.password}</p>}
                                    {response === 401 && <p className="input-error">Incorrect Email or Password</p>}
                                </div>
                                <div className="login-btn">
                                    <button className="login-submit" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </main>
    )
}

export default Home