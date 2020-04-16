import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

instance.interceptors.request.use(config => {
    // Always add authorization header if token is stored
    if (localStorage.userToken) {
        config.headers['Authorization'] = `Bearer ${localStorage.userToken}`
    }

    return config;
});

instance.interceptors.response.use(response => {
    return response
}, error => {
    // Remove authentication token when invalid
    if (localStorage.userToken && error.response.status === 401) {
        delete localStorage.userToken
    }

    return Promise.reject(error)
})

export default instance;