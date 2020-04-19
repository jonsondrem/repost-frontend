<template>
    <div class="post-info">
        <Navbar></Navbar>
        <div v-if="post" class="post">
            <div class="circle">
                <div v-if="author && author.avatar_url">
                    <img :src="author.avatar_url" alt="Profile Picture">
                </div>
                <div v-else-if="loaded">No Avatar</div>
            </div>
            <div class="author">Author:
                <span v-if="author">
                    <router-link :to="`/users/${author.username}`">
                        <a>{{ author.username }}</a>
                    </router-link>
                </span>
                <span v-else-if="loaded">unknown</span>
            </div>

            <div class="resub">- Resub: <router-link :to="`/resubs/${post.parent_resub_name}/posts/`">
                <a>{{ post.parent_resub_name }}</a>
            </router-link></div>

            <EditAndDelete v-if="isAuthor" :delete-action="deletePost" :edit-route="editRoute"/>

            <div class="info">
                <div class="section-header">{{ post.title }}</div>
                <div class="content">{{ post.content }}</div>
            </div>
        </div>

        <Notice v-else-if="loaded" title="Post not found!">
            We were not able to load the post. Have you inputted the url correctly?
        </Notice>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import Notice from "@/components/Notice";
    import EditAndDelete from "@/components/EditAndDelete";

    export default {
        name: "Post",
        components: {EditAndDelete, Notice, Navbar},
        props: {
            post_id: {
                type: String,
                default: null,
                required: true
            },
            resubname: {
                type: String,
                default: '',
                required: true
            }
        },
        data () {
            return {
                state: this.$store.state,
                post: null,
                author: null,
                loaded: false
            }
        },
        async created () {
            await this.loadData()
            this.loaded = this.$loaded()
        },
        computed: {
            isAuthor () {
                return this.state.currentUser?.username === this.author?.username
            },
            editRoute () {
                return {
                    name: 'editPost',
                    params: {
                        resubname: this.post.parent_resub_name,
                        post_id: this.post.id.toString(),
                        post: this.post
                    }
                }
            }
        },
        methods: {
            async loadData() {
                try {
                    this.post = (await this.$http.get(`/posts/${this.post_id}/`)).data
                } catch (error) {
                    return
                }

                if (this.post.parent_resub_name !== this.resubname) {
                    this.post = null
                    return
                }

                try {
                    this.author = (await this.$http.get(`/users/${this.post.author_username}/`)).data
                } catch (error) {
                    // Ignore and leave this.user as null
                }
            },
            async deletePost() {
                try {
                   await this.$http.delete(`/posts/${this.post_id}`)
                   await this.$router.push(`/resubs/${this.post.parent_resub_name}/posts/`)
                } catch (error) {
                    // TODO: handle delete error
                }
            }
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

</style>