import axios from 'axios'

const instance = axios.create();

// Load API names and URLs from environment variables
// URLs will be VUE_APP_API_{number} in the order of API names defined in VUE_APP_APIS
const apis = []
for (const [index, api] of process.env.VUE_APP_APIS.split(';').entries()) {
    const url = process.env[`VUE_APP_API_${index}`];
    if (url) {
        apis.push({name: api, url: url})
    }
}

console.log(apis)

if (!localStorage.apiUrl) {
    localStorage.apiUrl = apis[0].url
}

instance.interceptors.request.use(config => {
    config.baseURL = localStorage.apiUrl + '/api'

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