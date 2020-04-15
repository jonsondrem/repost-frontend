<template>
    <div class="post-info">
        <Navbar></Navbar>
        <div v-if="postExist" class="post">
            <div class="circle">
                <div v-if="user.avatar_url != null">
                    <img v-bind:src="user.avatar_url" alt="Profile Picture">
                </div>
                <div v-else>No Avatar</div>
            </div>
            <div class="author">Author: <a v-bind:href="'/users/' + user.username">{{ user.username }}</a></div>
            <div class="resub">- Resub: <a v-bind:href="'/resubs/' + post.parent_resub_name + '/posts/'">{{ post.parent_resub_name }}</a></div>
            <div class="info">
                <div class="section-header">{{ post.title }}</div>
                <div class="content">{{ post.content }}</div>
            </div>
        </div>

        <div v-else class="no-post">
            <div class="no-post-title">Post not found!</div>
            <div class="no-post-desc">We were not able to load the post. Have you inputted the url correctly?</div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    export default {
        name: "DisplayPost",
        components: {Navbar},
        props: {
            post_id: {
                type: String,
                default: '',
                required: true
            },
            resubname: {
                type: String,
                default: '',
                required: true
            }
        },
        data: function() {
            return {
                postExist: false,
                post: {
                    "id": null,
                    "parent_resub_name": null,
                    "title": null,
                    "url": null,
                    "content": null,
                    "author_username": null,
                    "created": null,
                    "edited": null,
                    "votes": null
                },
                user: {
                    "username": null,
                    "bio": null,
                    "avatar_url": null,
                    "created": null,
                    "edited": null
                }
            }
        },
        created() {
            fetch('http://127.0.0.1:8000/api/posts/' + this.post_id)
                .then(response => response.json()
                    .then(json => ({
                        status: response.status,
                        body: json
                    })))
                .then(obj => {
                    if (obj.status == 200) {
                        if (obj.body.parent_resub_name === this.resubname) {
                            this.postExist = true;
                            this.post = obj.body;
                            console.log('Fetched post')
                            fetch('http://127.0.0.1:8000/api/users/' + this.post.author_username)
                                .then(response => response.json())
                                .then(json => {
                                    console.log('fetched user')
                                    this.user = json;
                                })
                        }
                    }
                });
        }
    }
</script>

<style scoped>
    .post {
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

    .author {
        padding-top: 54px;
        padding-left: 10px;
        font-size: 22px;
        float: left;
    }

    .author a {
        color: #00ff73;
        text-decoration: none;
    }

    .author a:hover {
        text-decoration: underline;
    }

    .resub {
        padding-top: 54px;
        padding-left: 10px;
        font-size: 22px;
        float: left;
    }

    .resub a {
        color: #45b1ff;
        text-decoration: none;
    }

    .resub a:hover {
        text-decoration: underline;
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

    .no-post {
        position: absolute;
        background-color: #2e2e2e;
        width: 40%;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 50%);
        color: white;
    }

    .no-post-title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
    }

    .no-post-desc {
        text-align: center;
        padding-top: 16px;
        padding-bottom: 12px;
        font-size: 12px;
    }
</style>