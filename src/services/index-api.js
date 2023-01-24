import axios from 'axios'

const baseURL = 'http://localhost:3001/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance 