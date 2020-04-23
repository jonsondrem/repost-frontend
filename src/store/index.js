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
        get api () {
            return parseInt(localStorage.getItem('selectedApi') || 0)
        },
        set api (value) {
            this.currentUser = null
            this.userToken = null
            setLocalStorage('selectedApi', value)
        }
    },
    async getCurrentUser () {
        if (!this.state.userToken) {
            return this.state.currentUser = null
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