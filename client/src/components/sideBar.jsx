import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';

import useAuth from '../hooks/useAuth';

function SideBar() {
    const navigate = useNavigate()
    const { id, username, image } = useAuth()

    const logout = () => {
        localStorage.removeItem('accessToken')
        navigate('/')
    }

    return (
        <aside className='side-bar-container'>
            <div className='side-bar'>
                <ul className='side-nav'>
                    <li className='side-bottom-element'>
                        <Link to={`/dashboard/${id}`} className='side-bottom-link'>
                            <img className='side-img' src={image} alt={username} /> 
                            <p className='highlight'>Profile</p>
                        </Link>
                    </li>
                    <li className='side-bottom-element'>
                        <Link to="/dashboard/users" className='side-bottom-link'>
                            <PersonIcon className="side-icon" />
                            <p>Users</p>
                        </Link>
                    </li>
                    <li className='side-bottom-element'>
                        <Link to="/dashboard/incomes" className='side-bottom-link'>
                            <LibraryBooksIcon className="side-icon" />
                            <p>Incomes</p>
                        </Link>
                    </li>
                    <li className='side-bottom-element'>
                        <Link to="/dashboard/expenses" className='side-bottom-link'>
                            <ImportContactsIcon className="side-icon" />
                            <p>Expenses</p>
                        </Link>
                    </li>
                    <div className='side-bottom'>
                        <li className='side-bottom-element'>
                            <Link to="/dashboard/contact" className='side-bottom-link'>
                                <SupportAgentIcon className="side-icon" />
                                <p>Contact</p>
                            </Link>
                        </li>
                        <li className='side-bottom-element'>
                            <Link to="dashboard/feedback" className='side-bottom-link'>
                                <FeedbackIcon className="side-icon" />
                                <p>FeedBack</p>
                            </Link>
                        </li>
                        <li onClick={logout} className='side-bottom-element'>
                            <span onClick={logout} className='side-bottom-link link-logout'>
                                <LogoutIcon className="side-logout" />
                            </span>
                        </li>
                    </div>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar