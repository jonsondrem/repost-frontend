<template>
    <div class="resub-page">
        <Navbar></Navbar>

        <div v-if="resub">
            <div v-if="state.currentUser" class="form-panel">
                <router-link :to="{ name: 'PostForm', params: { resub_name: resub.name } }">
                    <a>Create Post</a>
                </router-link>
            </div>

            <div id="post-data" class="post-data">
                <PostList :posts="posts"/>

                <div class="resub-info">

                    <div class="resub-info-top">
                        <div v-if="isOwner" class="edit-delete">
                            <router-link :to="{name: 'EditResub',
                                params: { resubname: resub.name, resub: resub} }">
                                <a>Edit</a>
                            </router-link> -
                            <span @click="deleteResub" class="delete">Delete</span>
                        </div>
                        <div class="resub-title">Resub: {{ resub.name }}</div>
                        Owner
                        <router-link :to="`/users/${resub.owner_username}`" class="resub-owner">
                            <a>{{ resub.owner_username }}</a>
                        </router-link>
                        - Total Posts <span class="resub-posts-count">{{ posts.length }}</span>
                    </div>
                    <div class="resub-info-bottom">
                        <span class="resub-about-header">About {{ resub.name }}</span>
                        <p class="resub-about">{{ resub.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="loaded" class="no-resub">
            <div class="no-resub-title">Resub not found!</div>
            <div class="no-resub-desc">We were not able to load the resub. Have you inputted the url correctly?</div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import PostList from '@/components/PostList';

    export default {
        name: "Resub",
        components: {Navbar, PostList},
        props: {
            resubname: {
                type: String,
                default: '',
                required: true
            }
        },
        data () {
            return {
                state: this.$store.state,
                posts: [],
                resub: null,
                loaded: false
            }
        },
        computed: {
            isOwner () {
                return this.state.currentUser?.username === this.resub?.owner_username
            }
        },
        async created () {
            await this.loadData()
            this.loaded = this.$loaded()
        },
        methods: {
            async loadData () {
                try {
                    this.resub = (await this.$http.get(`/resubs/${this.resubname}/`)).data
                } catch (error) {
                    return;
                }

                this.posts = (await this.$http.get(`/resubs/${this.resub.name}/posts/`)).data
            },
            async deleteResub() {
                try {
                   await this.$http.delete(`/resubs/${this.resub.name}/`)
                } catch (error) {
                    // TODO: handle delete error
                }

                await this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

     .edit-delete {
        text-align: right;
        font-size: 12px;
    }

    .edit-delete a {
        text-decoration: none;
        color: white;
        margin-bottom: 2px;
    }

    .edit-delete a:hover {
        text-decoration: underline;
    }

    .edit-delete span {
        color: #ff0000;
    }

    .edit-delete span:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .form-panel {
        position: absolute;
        top: 175px;
        left: 50%;
        transform: translate(-50%);
    }

    .form-panel a {
        font-weight: bold;
        font-size: 17px;
        text-decoration: none;
        color: #45b1ff;
        transition: 0.2s;
    }

    .form-panel a:hover {
        color: white;
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

    .post-info a {
        text-decoration: none;
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