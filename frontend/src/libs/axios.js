import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://imagegallery-backend-ovmt.onrender.com/api/v1/',
    withCredentials: true
})