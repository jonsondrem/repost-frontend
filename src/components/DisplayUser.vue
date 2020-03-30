<template>
    <div class="user-info">
        <div v-if="userExist" class="user">
            <div class="circle">
                <div v-if="user.avatar_url != null">
                    <img v-bind:src="user.avatar_url" alt="Profile Picture">
                </div>
                <div v-else>No Avatar</div>
            </div>
            <div class="username">User: <span>{{ username }}</span></div>
            <div class="info">
                <div class="section-header">Bio:</div>
                <div class="content" v-if="user.bio === null">This user has currently no bio.</div>
                <div class="content" v-else>{{ user.bio }}</div>

                <div class="section-header">Owned Resubs:</div>
                <div class="content" v-if="resubs.length > 0">
                    <div v-for="(resub, index) in resubs" v-bind:key="index">
                        <a class="resub" v-bind:href="'/resubs/' + resub.name + '/posts'">{{ resub.name }}</a>
                    </div>
                </div>
                <div class="content" v-else>This user currently doesn't own a resub.</div>

                <div class="section-header">Posts:</div>
                <div class="content" v-if="posts.length > 0">
                    <div v-for="(post, index) in posts" v-bind:key="index">
                        "<a class="post" v-bind:href="'/resubs/' + post.parent_resub_name + '/posts/' + post.id">{{
                            post.title }}</a>" in resub <a class="resub"
                                                           v-bind:href="'/resubs/' + post.parent_resub_name + '/posts'">{{
                        post.parent_resub_name }}</a>
                    </div>
                </div>
                <div class="content" v-else>This user hasn't made a post yet.</div>
            </div>
        </div>

        <div v-else class="no-user">
            <div class="no-user-title">User not found!</div>
            <div class="no-user-desc">We were not able to load the user. Have you inputted the url correctly?</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DisplayUser",
        props: {
            username: {
                type: String,
                default: '',
                required: true
            }
        },
        data: function() {
            return {
                userExist: false,
                user: {
                    "username": null,
                    "bio": null,
                    "avatar_url": null,
                    "created": null,
                    "edited": null
                },
                resubs: [],
                posts: []
            }
        },
        created() {
            fetch('http://127.0.0.1:8000/api/users/' + this.username )
                .then(response => response.json()
                .then(json => ({
                    status: response.status,
                    body: json
                })))
                .then(obj => {
                    if (obj.status == 200) {
                        this.userExist = true;
                        this.user = obj.body;
                    }
                });
            fetch('http://127.0.0.1:8000/api/users/' + this.username + '/resubs')
                .then(response => response.json())
                .then(json => {
                    for (const i in json) {
                        this.resubs.push(json[i]);
                    }
                });
            fetch('http://127.0.0.1:8000/api/users/' + this.username + '/posts')
                .then(response => response.json())
                .then(json => {
                    for (const i in json) {
                        this.posts.push(json[i]);
                    }
                });
        }
    }
</script>

<style scoped>
    .user {
        position: absolute;
        background-color: #2e2e2e;
        width: 50%;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 0);
        color: white;
        border-radius: 65px 0 0 0;
        min-height: 200px;
    }

    .circle {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background-color: #242424;
        float: left;
    }

    .circle div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .circle img {
        max-width: 85%;
        max-height: 85%;
        border-radius: 50%;
    }

    .username {
        padding-top: 54px;
        padding-left: 10px;
        font-size: 22px;
        float: left;
    }

    .username span {
        color: #00ff73;
    }

    .info {
        clear: both;
        padding-left: 3%;
        padding-top: 10px;
    }

    .section-header {
        font-size: 22px;
        font-weight: bold;
        padding-bottom: 6px;
    }

    .content {
        font-size: 16px;
        padding-bottom: 32px;
    }

    .resub {
        color: #45b1ff;
        text-decoration: none;
    }

    .resub:hover {
        text-decoration: underline;
    }

    .post {
        color: white;
        text-decoration: none;
    }

    .post:hover {
        text-decoration: underline;
    }

    .no-user {
        position: absolute;
        background-color: #2e2e2e;
        width: 40%;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 50%);
        color: white;
    }

    .no-user-title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
    }

    .no-user-desc {
        text-align: center;
        padding-top: 16px;
        padding-bottom: 12px;
        font-size: 12px;
    }
</style>