<template>
    <div class="post-info">
        <Navbar></Navbar>
        <div v-if="post" class="view">
            <div class="post">
                <div class="circle">
                    <div v-if="author && author.avatar_url != null">
                        <img :src="author.avatar_url" alt="Profile Picture">
                    </div>
                    <div v-else-if="loaded">No Avatar</div>
                </div>
                <div class="author">Author:
                    <span v-if="author != null">
                    <router-link :to="`/users/${author.username}`">
                        <a>{{ author.username }}</a>
                    </router-link>
                </span>
                    <span v-else-if="loaded">unknown</span>
                </div>

                <div class="resub">- Resub:
                    <router-link :to="`/resubs/${post.parent_resub_name}/posts/`">
                        <a>{{ post.parent_resub_name }}</a>
                    </router-link>
                </div>

            <div v-if="state.currentUser && author">
                <div v-if="author.username === state.currentUser.username" class="edit-delete">
                    <router-link :to="{name: 'PostForm',
                        params: { resubname: post.parent_resub_name,
                            post_id: post_id,
                            title: post.title,
                            pic_url: post.url,
                            content: post.content } }">
                            <a>Edit</a>
                        </router-link>
                        -
                        <span @click="deletePost" class="delete">Delete</span>
                    </div>
                </div>

                <div class="info">
                    <div class="section-header">{{ post.title }}</div>
                    <div class="content">{{ post.content }}</div>
                </div>

                <div class="comment-input-header">Comment:</div>
                <div class="comment-input">
                    <textarea placeholder="Enter your comment here..." v-model="comment_content"></textarea>
                    <button @click="submitComment">Submit Comment</button>
                </div>
                <div class="empty-space"></div>
            </div>

            <div class="comments" v-if="comments.length > 0">
                <div class="comment-header">Comments</div>
                <div class="comment" v-for="comment in comments" :key="comment.id">
                    <div class="comment-circle">
                        <div>N/A</div>
                    </div>
                    <div class="comment-author">From:
                        <span v-if="comment.author_username != null">
                    <router-link :to="`/users/${comment.author_username}`">
                        <a>{{ comment.author_username }}</a>
                    </router-link>
                </span>
                        <span v-else-if="loaded">unknown</span>
                    </div>

                    <div v-if="state.currentUser">
                        <div class="comment-edit-delete">
                            <span v-if="state.currentUser.username === comment.author_username" @click="showEditPopup(comment)" class="edit-comment">Edit</span>
                            <span v-if="state.currentUser.username === comment.author_username"> - </span>
                            <span @click="deleteComment(comment)" class="delete" v-if="state.currentUser.username === comment.author_username || state.currentUser.username === author.username">Delete</span>
                        </div>
                    </div>

                    <div class="comment-info">
                        <div class="comment-content">{{ comment.content }}</div>
                    </div>

                    <div v-if="comment.replies.length > 0" class="replies">
                        <Reply :replies="comment.replies" :dashes="''"></Reply>
                    </div>
                </div>
            </div>
            <div class="comments" v-else-if="loaded">
                <div class="comment-header">No Comments yet!</div>
            </div>
        </div>

        <div v-else-if="loaded" class="no-post">
            <div class="no-post-title">Post not found!</div>
            <div class="no-post-desc">We were not able to load the post. Have you inputted the url correctly?</div>
        </div>

        <div class="form-popup" :style="{display: form}" v-if="edited_comment">
            <button @click="closePopup"></button>
            <textarea v-model="edited_comment.content"></textarea>
            <button @click="editComment()">Edit comment</button>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import Reply from '@/components/Reply';

    export default {
        name: "Post",
        components: {Navbar, Reply},
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
                loaded: false,
                comments: [],
                replies: [],
                comment_content: '',
                edited_comment: null,
                form: 'none'
            }
        },
        async created () {
            await this.loadData()
            this.loaded = this.$loaded()
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

                const commentList = (await this.$http.get(`/posts/${this.post_id}/comments/`)).data
                for(const comment of commentList) {
                    comment.replies = []
                    for(const reply of commentList) {
                        if(comment.id === reply.parent_comment_id) {
                            comment.replies.push(reply)
                        }
                    }
                    if(!comment.parent_comment_id) {
                        this.comments.push(comment)
                    } else {
                        this.replies.push(comment)
                    }
                }
            },
            async deletePost() {
                try {
                   await this.$http.delete(`/posts/${this.post_id}`)
                   await this.$router.push(`/resubs/${this.post.parent_resub_name}/posts/`)
                } catch (error) {
                    // TODO: handle delete error
                }
            },
            async submitComment() {
                const data = {
                    content: this.comment_content
                }

                try {
                    await this.$http.post(`/posts/${this.post_id}/comments/`, data)
                    await this.$router.go(0)
                } catch (error) {
                    //TODO send feedback to user
                }
            },
            async editComment() {
                const data = {
                    content: this.edited_comment.content
                }

                try {
                    await this.$http.patch(`/comments/${this.edited_comment.id}/`, data)
                    await this.$router.go(0)
                } catch (error) {
                    //TODO send feedback to user
                }
            },
            async deleteComment(comment) {
                try {
                    await this.$http.delete(`/comments/${comment.id}/`)
                    await this.$router.go(0)
                } catch (error) {
                    //TODO send feedback to user
                }
            },
            getVoteColor (vote) {
                if (vote > 0) {
                    return 'color: #00ff73';
                } else if (vote < 0) {
                    return 'color: #ff0000';
                }
                return 'color: #ffffff';
            },
            showEditPopup(comment) {
                this.form = 'block'
                this.edited_comment = comment
            },
            closePopup() {
                this.form = 'none'
            }
        }
    }
</script>

<style scoped>
    .view {
        position: absolute;
        top: 200px;
        transform: translate(-50%, 0);
        left: 50%;
    }

    .post {
        position: relative;
        background-color: #2e2e2e;
        width: 1000px;
        left: 50%;
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

    .edit-delete {
        float: right;
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

    .delete a:hover {
        text-decoration: underline;
    }

    .delete {
        color: #ff0000;
    }

    .delete:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .info {
        clear: both;
        padding-left: 3%;
        padding-top: 10px;
        border-bottom: 3px;
        border-style: dashed;
        border-color: #242424;
        margin-bottom: 32px;
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

    hr {
        width: 94%;
    }

    .comment-input-header {
        position: relative;
        left: 3%;
        margin-bottom: 6px;
    }

    .comment-input {
        position: relative;
        width: 47%;
        left: 3%;
    }

    .comment-input textarea{
        width: 70%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        height: 100px;
        min-height: 50px;
        border: none;
        border-radius: 4px 0 0 4px;
    }

    .comment-input button {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        width: 30%;
        height: 100%;
        border: none;
        background-color: #242424;
        color: #45b1ff;
        font-family: Consolas, monaco, monospace;
        border-radius: 0 4px 4px 0;
        transition: 0.2s;
    }

    .comment-input button:hover {
        color: white;
    }

    .empty-space {
        height: 12px;
    }

    .comments {
        position: relative;
    }

    .comment-header {
        color: #45b1ff;
        font-size: 17px;
        text-align: center;
        margin-top: 12px;
    }

    .comment {
        background-color: #2e2e2e;
        width: 100%;
        color: white;
        border-radius: 20px 0 0 0;
        margin-top: 12px;
    }

    .comment-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #242424;
        float: left;
    }

    .comment-circle div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .comment-circle img {
        max-width: 85%;
        max-height: 85%;
        border-radius: 50%;
    }

    .comment-author {
        padding-left: 6px;
        font-size: 12px;
        float: left;
    }

    .comment-author a {
        color: #00ff73;
        text-decoration: none;
    }

    .comment-author a:hover {
        text-decoration: underline;
    }

    .comment-edit-delete {
        float: right;
        font-size: 12px;
    }

    .edit-comment {
        color: white;
        cursor: pointer;
    }

    .edit-comment:hover {
        text-decoration: underline;
    }

    .comment-info {
        clear: both;
        padding-left: 2px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .comment-info hr {
        width: 100%;
    }

    .comment-content {
        font-size: 12px;
    }

    .replies {
        border-top: 3px;
        border-style: dashed;
        border-color: #242424;
        font-size: 12px;
        padding-bottom: 6px;
        padding-top: 6px;
    }

    .replies a {
        color: #00ff73;
        text-decoration: none;
    }

    .replies a:hover {
        text-decoration: underline;
    }

    .form-popup {
        position: fixed;
        width: 250px;
        height: 250px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: 0.2s;
        background-color: #242424;
    }
</style>