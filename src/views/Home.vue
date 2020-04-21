<template>
    <div id="post-data" class="post-data">
        <Navbar/>
        <PostList :posts="posts"/>

        <div v-if="topPost" class="top-rated-post">
            <router-link :to="`resubs/${topPost.parent_resub_name}/posts/${topPost.id}`" class="post-link"></router-link>
            <div class="top-rated-post-top">
                <span class="top-post-title">Top Rated Post</span>
                <span class="post-info-space">From </span>
                <router-link :to="`resubs/${topPost.parent_resub_name}`" class="post-info-resub">
                    <a>{{ topPost.parent_resub_name }}</a>
                </router-link> -
                <span class="post-info-space">By </span>
                <router-link :to="`users/${topPost.author_username}`" class="top-author">
                    <a>{{ topPost.author_username }}</a>
                </router-link>
                -
                <span>Votes </span><span class="top-post-votes">{{ topPost.votes }}</span>
            </div>
            <div class="top-rated-post-bottom">
                <span class="top-rated-post-title">{{ topPost.title }}</span>
                <p class="top-rated-post-content">{{ topPost.content }}</p>
            </div>
        </div>
        <div v-else-if="loaded" class="top-rated-post">
            <div class="top-rated-post-top">
                <span class="top-post-title">Failed to find a top post</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import PostList from '@/components/PostList';

    export default {
        name: "Home",
        components: {Navbar, PostList},
        data () {
            return {
                posts: [],
                topPost: null,
                loaded: false
            }
        },
        async created () {
            await this.loadData()
            this.loaded = this.$loaded()
        },
        methods: {
            async loadData () {
                const resubs = (await this.$http.get('/resubs/')).data

                // Load all posts from every resub concurrently
                await Promise.all(resubs.map(resub =>
                    this.$http.get(`/resubs/${resub.name}/posts/`).then(response => this.posts.push(...response.data))))

                // Find and set the top post
                if (this.posts) {
                    this.topPost = this.posts.reduce((a, b) => a.votes > b.votes ? a : b)
                }
            }
        }
    }
</script>

<style scoped>
    .post-circle img {
        position: absolute;
        width: 80%;
        height: 80%;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .post-info a {
        text-decoration: none;
    }

    .post-info-resub {
        position: relative;
        color: #45b1ff;
        z-index: 2;
    }

    .post-info-resub:hover {
        text-decoration: underline;
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
        display: block;
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
        padding-right: 3%;
    }

    .top-rated-post-content {
        position: relative;
        font-size: 16px;
        padding-top: 16px;
        left: 3%;
        padding-right: 3%;
    }
</style>