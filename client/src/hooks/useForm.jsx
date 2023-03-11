import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

export default function useForm(initialData, onValidate, endpoint, message, toNavigate) {
    const [form, setForm] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [response, setResponse] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = onValidate(form)
        setErrors(err)

        if (Object.keys(err).length === 0) {
            setLoading(true)
            axios.post(`http://localhost:8080/api/v1/${endpoint}`, form)
            .then(res => {
                setResponse(res)
                res.status === 200 && localStorage.setItem('accessToken', res.data.token)
                res.status === 200 && navigate(`/dashboard/${toNavigate}`)
                setForm(initialData)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    res.status === 201 && navigate(0)
                }, 1500)
                setLoading(false)
            })
            .catch(error => {
                setResponse(error.response.status)
                setLoading(false)
            })
        }
    }

    return { form, response, errors, loading, handleChange, handleSubmit }
}