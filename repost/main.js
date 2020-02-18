var app = new Vue({
    el: '#app',
    data: {
        product: 'Test'
    }
})

var current_user = new Vue({
    el: '#login',
    data: {
        user: ''
    },
    mounted () {
        fetch('http://127.0.0.1:8000/api/users/me')
            .then(response => response.json())
            .then(json => {
                this.user = json.username;
            })
    }
})