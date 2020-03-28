<template>
    <div id="post-data" class="post-data">
        <div class="post-list">
            <div class="post" v-bind:key="index" v-for="(post, index) in posts">
                <div class="post-circle"></div>
                <div class="post-info">
                    <a v-bind:href="'resubs/' + post.parent_resub_name + '/posts/' + post.id" class="post-link"></a>
                    <div class="post-info-left">
                        <a v-bind:href="'resubs/' + post.parent_resub_name" class="post-info-resub">{{
                            post.parent_resub_name }}</a>
                        <span class="post-info-space"> - </span>
                        <a v-bind:href="'users/' + post.author_username" class="post-info-user">{{ post.author_username
                            }}</a>
                        <br>
                        <span class="post-info-title">{{ post.title }}</span>
                    </div>
                    <div class="post-info-right" v-bind:style="getVoteColor(post.votes)">
                        <span class="post-info-votes">{{ post.votes }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="top-rated-post">
            <a v-bind:href="'resubs/' + topPost.parent_resub_name + '/posts/' + topPost.id" class="post-link"></a>
            <div class="top-rated-post-top">
                <span class="top-post-title">Top Rated Post</span>
                <br>
                <span class="post-info-space">From </span>
                <a v-bind:href="'resubs/' + topPost.parent_resub_name" class="post-info-resub">{{
                    topPost.parent_resub_name }}</a> -
                <span class="post-info-space">By </span>
                <a v-bind:href="'users/' + topPost.author_username" class="top-author">{{ topPost.author_username }}</a>
                -
                <span>Votes </span><span class="top-post-votes">{{ topPost.votes }}</span>
            </div>
            <div class="top-rated-post-bottom">
                <span class="top-rated-post-title">{{ topPost.title }}</span>
                <p class="top-rated-post-content">{{ topPost.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostData",
        data: function () {
            return {
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
            }
        },
        created() {
            fetch('http://127.0.0.1:8000/api/resubs/')
                .then(response => response.json())
                .then(json => {
                    for (var i in json) {
                        this.resubs.push(json[i]);
                        fetch('http://127.0.0.1:8000/api/resubs/' + this.resubs[i].name + '/posts')
                            .then(response => response.json())
                            .then(json2 => {
                                for (var x in json2) {
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
            getVoteColor: function (vote) {
                if (vote == 0) {
                    return 'color: #ffffff';
                } else if (vote < 0) {
                    return 'color: #ff0000';
                }
                return 'color: #00ff73';
            }
        }
    }
</script>

<style scoped>
    .post-list {
        position: absolute;
        color: white;
        top: 200px;
        left: 10%;
        width: 35%;
    }

    .post {
        height: 80px;
        margin-bottom: 5px;
        transition: 0.2s;
    }

    .post:hover {
        filter: brightness(110%);
    }

    .post-circle {
        position: relative;
        height: 80px;
        width: 80px;
        background-color: #242424;
        border-radius: 50%;
        z-index: 1;
    }

    .post-circle img {
        position: absolute;
        width: 80%;
        height: 80%;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .post-info {
        position: relative;
        top: -65px;
        left: 10%;
        width: 87%;
        height: 50px;
        background-color: #2e2e2e;
        padding-left: 3%;
        font-size: 12px;
    }

    .post-info a {
        text-decoration: none;
    }

    .post-info-left {
        float: left;
        width: 90%;
        height: 100%;
    }

    .post-info-right {
        position: relative;
        float: right;
        width: 10%;
        height: 100%;
    }

    .post-info-resub {
        position: relative;
        color: #45b1ff;
        z-index: 2;
    }

    .post-info-resub:hover {
        text-decoration: underline;
    }

    .post-info-user {
        position: relative;
        color: white;
        z-index: 2;
    }

    .post-info-user:hover {
        text-decoration: underline;
    }

    .post-info-title {
        position: absolute;
        font-weight: bold;
        bottom: 15%;
        font-size: 22px;
        color: white;
    }

    .post-info-votes {
        position: absolute;
        font-size: 22px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .top-rated-post {
        position: absolute;
        top: 200px;
        right: 10%;
        width: 35%;
        transition: 0.2s;
    }

    .top-rated-post:hover {
        filter: brightness(110%);
    }

    .top-rated-post-top {
        position: relative;
        background-color: #2e2e2e;
        width: 100%;
        color: #ffffff;
        text-align: center;
        font-size: 12px;
        top: 15px;
        height: 50px;
    }

    .top-post-title {
        font-size: 22px;
    }

    .top-rated-post-top a {
        text-decoration: none;
    }

    .top-rated-post-top a:hover {
        text-decoration: underline;
    }

    .top-author {
        position: relative;
        color: #00ff73;
        z-index: 2;
    }

    .top-post-votes {
        color: #45b1ff;
    }

    .top-rated-post-bottom {
        position: relative;
        background-color: #242424;
        top: 15px;
        width: 100%;
        min-height: 200px;
        color: white;
        padding-top: 2%;
    }

    .post-link {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        outline: none;
    }

    .top-rated-post-title {
        position: relative;
        font-size: 22px;
        font-weight: bold;
        top: 10%;
        left: 3%;
    }

    .top-rated-post-content {
        position: relative;
        font-size: 16px;
        padding-top: 16px;
        left: 3%;
    }
</style>