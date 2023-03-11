import { Outlet, Navigate } from 'react-router-dom'

export default function AuthUsers () {
    const token = localStorage.getItem('accessToken')

    return (
        token ? <Outlet /> : <Navigate to="/" />
    )
}