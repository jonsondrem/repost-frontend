var posts = new Vue({
    el: '#post-list',
    data: {
        posts: [],
        resubs: []
    },
    created () {
        fetch('http://127.0.0.1:8000/api/resubs/')
            .then(response => response.json())
            .then(json => {
                for (i in json) {
                    this.resubs.push(json[i]);
                    fetch('http://127.0.0.1:8000/api/resubs/' + this.resubs[i].name + '/posts')
                        .then(response => response.json())
                        .then(json2 => {
                            for (x in json2) {
                                this.posts.push(json2[x]);
                            }
                        });
                }
            });
    }
});

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
});