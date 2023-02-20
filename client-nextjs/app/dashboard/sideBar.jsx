'use client'

import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { decode } from 'jsonwebtoken';
import axios from 'axios';
import Router from 'next/router';

import Image from 'next/image';
import logo from '../../public/logo.jpg';

export default function SideBar() {

    const [userData, setUserData] = useState([]);
    const [] = useState();

    const token = localStorage.getItem("accessToken");
    const decoded = decode(token)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/profile/${decoded.id}`)
            .then(res => {
                setUserData(res.data.user)
            }).catch(err => console.log(err))
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken')
        Router.push('/auth')
    }
    return (
        <div className='sidebar-container'>
            <aside className='sidebar' data-sidebar>
                <div className='top-sidebar-actions'>
                    <p>{userData.rol}</p>
                    {/* <MenuIcon className='menu-icon' /> */}
                </div>
                <div className='top-sidebar'>
                    <a href="#" className='image-profile' >
                        <Image src={logo} width={70} height={70} alt='logo' />
                    </a>
                    <p className='sidebar-username'>{userData.username}</p>
                    <a className='sidebar-profile' href="#">Profile</a>
                </div>
                <div className='middle-sidebar'>
                    <ul className='sidebar-list'>
                        <li className='sidebar-list-item active'>
                            <a href="/dashboard" className='sidebar-link'>
                                <DashboardIcon variant="outlined" className="sidebar-icon" />
                                Dashboard
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="/dashboard/incomes" className='sidebar-link'>
                                <DescriptionIcon variant="outlined" className="sidebar-icon" />
                                Incomes
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="/dashboard/incomes/form" className='sidebar-link'>
                                <DescriptionIcon variant="outlined" className="sidebar-icon" />
                                new income
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="/dashboard/expenses" className='sidebar-link'>
                                <DescriptionIcon variant="outlined" className="sidebar-icon" />
                                Expenses
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="/dashboard/expenses/form" className='sidebar-link'>
                                <DescriptionIcon variant="outlined" className="sidebar-icon" />
                                new expense
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="/dashboard/users" className='sidebar-link'>
                                <PersonIcon variant="outlined" className="sidebar-icon" />
                                Users
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="/dashboard/users/form" className='sidebar-link'>
                                <PersonIcon variant="outlined" className="sidebar-icon" />
                                new user
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="#" className='sidebar-link'>
                                <SupportAgentIcon variant="outlined" className="sidebar-icon" />
                                help
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="#" className='sidebar-link'>
                                <ContactSupportIcon variant="outlined" className="sidebar-icon" />
                                QA
                            </a>
                        </li>
                        <li className='sidebar-list-item'>
                            <a href="#" className='sidebar-link'>
                                <FeedbackIcon variant="outlined" className="sidebar-icon" />
                                Feedback
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-sidebar'>
                    <LogoutIcon onClick={logout} className='bottom-logout'></LogoutIcon>
                </div>
            </aside>
        </div>
    )
}
