import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
