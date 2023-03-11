import jwtDecode from "jwt-decode";

export default function useAuth () {
    const token = localStorage.getItem('accessToken')
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, rol, username, image } = decoded

        isAdmin = rol.includes('Admin')

        return { id, rol, isAdmin, status, username, image }
    }

    return { token, id: '', rol: '', username: '', image: '', isAdmin }
}