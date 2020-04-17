<template>
    <div class="user-info">
        <Navbar></Navbar>
        <div v-if="user != null" class="user">
            <div class="circle">
                <div v-if="user.avatar_url != null">
                    <img v-bind:src="user.avatar_url" alt="Profile Picture">
                </div>
                <div v-else>No Avatar</div>
            </div>
            <div class="username">User: <span>{{ username }}</span></div>
            <div class="info">
                <div class="section-header">Bio:</div>
                <div class="content" v-if="user.bio == null">This user has currently no bio.</div>
                <div class="content" v-else>{{ user.bio }}</div>

                <div class="section-header">Owned Resubs:</div>
                <div class="content" v-if="resubs.length > 0">
                    <div v-for="(resub, index) in resubs" v-bind:key="index">
                        <router-link v-bind:to="`/resubs/${resub.name}/posts`">
                            <a class="link">{{ resub.name }}</a>
                        </router-link>
                    </div>
                </div>
                <div class="content" v-else>This user currently doesn't own a resub.</div>

                <div class="section-header">Posts:</div>
                <div class="content" v-if="posts.length > 0">
                    <div v-for="(post, index) in posts" v-bind:key="index">
                        "<router-link v-bind:to="'/resubs/' + post.parent_resub_name + '/posts/' + post.id">
                            <a class="link">{{ post.title }}</a>
                        </router-link>" in resub
                        <router-link v-bind:to="`/resubs/${post.parent_resub_name}/posts`">
                            <a class="link">{{ post.parent_resub_name }}</a>
                        </router-link>
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
    import Navbar from '@/components/Navbar';
    export default {
        name: "User",
        components: {Navbar},
        props: {
            username: {
                type: String,
                default: '',
                required: true
            }
        },
        data: function() {
            return {
                user: null,
                resubs: [],
                posts: []
            }
        },
        async created() {
            try {
                this.user = (await this.$http.get(`/users/${this.username}`)).data
            } catch (error) {
                return;
            }

            this.resubs = (await this.$http.get(`/users/${this.user.username}/resubs`)).data
            this.posts = (await this.$http.get(`/users/${this.user.username}/posts`)).data
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

    a {
        text-decoration: none;
    }

    .link {
        color: #45b1ff;
        text-decoration: none;
    }

    .link:hover {
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