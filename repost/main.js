var posts = new Vue({
    el: '#post-data',
    data: {
        posts: [],
        resubs: [],
        topPost: {
            "id": -1,
            "parent_resub_name": "none",
            "title": "none",
            "url": "none",
            "content": "none",
            "author_username": "none",
            "created": "0",
            "edited": "0",
            "votes": 0
        }
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
                                if (this.posts[x].votes > this.topPost.votes) {
                                    this.topPost = this.posts[x];
                                }
                            }
                        });
                }
            });
    },
    methods: {
        getVoteColor: function(vote) {
            if (vote == 0) {
                return 'color: #ffffff';
            } else if (vote < 0) {
                return 'color: #ff0000';
            }
            return 'color: #00ff73';
        }
    }
});

var current_user = new Vue({
    el: '#login',
    data: {
        user: null
    },
    mounted () {
        fetch('http://127.0.0.1:8000/api/users/me')
            .then(response => response.json())
            .then(json => {
                this.user = json.username;
            })
    }
});