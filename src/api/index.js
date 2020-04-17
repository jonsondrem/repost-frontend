import axios from 'axios'

const instance = axios.create();
const apis = [
    {name: 'FastAPI', url: 'http://127.0.0.1:8000/api'},
    {name: 'Spring', url: 'http://127.0.0.1:8001/api'},
    {name: 'ASP.NET', url: 'http://127.0.0.1:8002/api'}
]

if (!localStorage.apiUrl) {
    localStorage.apiUrl = apis[0].url
}

instance.interceptors.request.use(config => {
    config.baseURL = localStorage.apiUrl

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

export default {instance, apis};