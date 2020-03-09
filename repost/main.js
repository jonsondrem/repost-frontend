var posts = new Vue({
    el: '#post-list',
    data: {
        posts: []
    },
    created () {
        fetch('http://127.0.0.1:8000/api/resubs/car/posts')
            .then(response => response.json())
            .then(json => {
                for (i in json) {
                    this.posts.push(json[i]);
                }
            })
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