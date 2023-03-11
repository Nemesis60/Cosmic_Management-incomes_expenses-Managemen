import { Outlet, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default function AuthUsers () {
    const token = localStorage.getItem('accessToken')
    const decoded = jwtDecode(token)

    return (
        decoded.rol === 'Admin' ? <Outlet /> : <Navigate to={-1} />
    )
}