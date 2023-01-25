import axios from 'axios'

const baseURL = 'https://quiz-backend-api.onrender.com/'
// const baseURL = 'http://localhost:3001/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance 