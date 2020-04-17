<template>
    <div class="post-list">
        <div class="post" v-bind:key="index" v-for="(post, index) in posts">
            <div class="post-circle"></div>
            <div class="post-info">
                <router-link v-bind:to="`/resubs/${post.parent_resub_name}/posts/${post.id}`" class="post-link"></router-link>
                <div class="post-info-left">
                    <span class="post-info-space">By </span>
                    <router-link v-bind:to="`/users/${post.author_username}`" class="post-info-user">
                        <a>{{ post.author_username }}</a>
                    </router-link>
                    <br>
                    <span class="post-info-title">{{ post.title }}</span>
                </div>
                <div class="post-info-right" v-bind:style="getVoteColor(post.votes)">
                    <span class="post-info-votes">{{ post.votes }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PostList',
        props: {
            posts: {}
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

    .resub-info-top a {
        text-decoration: none;
    }

    .resub-info-top a:hover {
        text-decoration: underline;
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

</style>