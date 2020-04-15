<template>
    <div class="resub-page">
        <Navbar></Navbar>
        <div v-if="resubExist">
            <div id="post-data" class="post-data">
                <div class="post-list">
                    <div class="post" v-bind:key="index" v-for="(post, index) in posts">
                        <div class="post-circle"></div>
                        <div class="post-info">
                            <a v-bind:href="'/resubs/' + post.parent_resub_name + '/posts/' + post.id"
                               class="post-link"></a>
                            <div class="post-info-left">
                                <span class="post-info-space">By </span>
                                <a v-bind:href="'/users/' + post.author_username" class="post-info-user">{{
                                    post.author_username
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

                <div class="resub-info">
                    <div class="resub-info-top">
                        <span class="resub-title">Resub: {{ resub.name }}</span>
                        <br>
                        Owner
                        <a v-bind:href="'/users/' + resub.owner_username" class="resub-owner">{{ resub.owner_username
                            }}</a>
                        - Total Posts <span class="resub-posts-count">{{ postCount }}</span>
                    </div>
                    <div class="resub-info-bottom">
                        <span class="resub-about-header">About {{ resub.name }}</span>
                        <p class="resub-about">{{ resub.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="no-resub">
            <div class="no-resub-title">Resub not found!</div>
            <div class="no-resub-desc">We were not able to load the resub. Have you inputted the url correctly?</div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    export default {
        name: "ResubPostsData",
        components: {Navbar},
        props: {
            resubname: {
                type: String,
                default: '',
                required: true
            }
        },
        data: function() {
            return {
                posts: [],
                resub: {
                    "name": null,
                    "description": null,
                    "owner_username": null,
                    "created": null,
                    "edited": null
                },
                postCount: 0,
                resubExist: false
            }
        },
        created() {
            fetch('http://127.0.0.1:8000/api/resubs/' + this.resubname)
                .then(response => response.json()
                .then(json => ({
                    status: response.status,
                    body: json
                })))
                .then(obj => {
                    if (obj.status == 200) {
                        this.resubExist = true;
                        this.resub = obj.body;
                    }
                });
            fetch('http://127.0.0.1:8000/api/resubs/' + this.resubname + '/posts')
                .then(response => response.json())
                .then(json => {
                    for (const i in json) {
                        this.posts.push(json[i]);
                        this.postCount++;
                    }
                });
        },
        methods: {
            getVoteColor: function (vote) {
                if (vote === 0) {
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

    .post-info-user {
        position: relative;
        color: #00ff73;
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

    .resub-info {
        position: absolute;
        top: 200px;
        right: 10%;
        width: 35%;
    }

    .resub-info-top {
        position: relative;
        background-color: #2e2e2e;
        width: 100%;
        color: #ffffff;
        text-align: center;
        font-size: 12px;
        top: 15px;
        height: 50px;
    }

    .resub-title {
        font-size: 22px;
    }

    .resub-info-top a {
        text-decoration: none;
    }

    .resub-info-top a:hover {
        text-decoration: underline;
    }

    .resub-owner {
        position: relative;
        color: #00ff73;
        z-index: 2;
    }

    .resub-posts-count {
        color: #45b1ff;
    }

    .resub-info-bottom {
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

    .resub-about-header {
        position: relative;
        font-size: 22px;
        font-weight: bold;
        top: 10%;
        left: 3%;
        padding-right: 3%;
    }

    .resub-about {
        position: relative;
        font-size: 16px;
        padding-top: 16px;
        left: 3%;
        padding-right: 3%;
    }

    .no-resub {
        position: absolute;
        background-color: #2e2e2e;
        width: 40%;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 50%);
        color: white;
    }

    .no-resub-title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
    }

    .no-resub-desc {
        text-align: center;
        padding-top: 16px;
        padding-bottom: 12px;
        font-size: 12px;
    }
</style>