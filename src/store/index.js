function setLocalStorage(property, value) {
    if (value) {
        localStorage.setItem(property, value)
    } else {
        localStorage.removeItem(property)
    }
}

const store = {
    http: null,
    state: {
        currentUser: null,
        get userToken () {
            return localStorage.getItem('userToken')
        },
        set userToken (value) {
            setLocalStorage('userToken', value)
        },
        get apiUrl () {
            return localStorage.getItem('apiUrl')
        },
        set apiUrl (value) {
            setLocalStorage('apiUrl', value)
        }
    },
    async getCurrentUser () {
        if (!this.state.userToken) {
            if (this.state.currentUser) {
                this.state.currentUser = null
            }
            return null
        }

        if (this.state.currentUser) {
            return this.state.currentUser
        }

        return this.state.currentUser = (await this.http.get('/users/me/')).data
    },
    logout () {
        this.state.currentUser = null
        this.state.userToken = null
    }
}

export default (http) => {
    store.http = http
    return store
}