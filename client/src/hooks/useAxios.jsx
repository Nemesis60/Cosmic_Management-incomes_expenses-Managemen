import { useEffect, useState } from "react"
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api/v1/'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

export default function useAxios (axiosParams) {
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')

    const fetchData = async (params) => {
        try {
            const result = await axios.request(params)
            setResponse(result.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(axiosParams)
    }, [axiosParams])

    return { fetch: () => fetchData(axiosParams), loading, response, error }
}