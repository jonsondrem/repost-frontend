<template>
    <div class="post-info">
        <Navbar></Navbar>
        <div v-if="post" class="view">
            <div class="post">
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

                <div class="resub">- Resub:
                    <router-link :to="`/resubs/${post.parent_resub_name}/posts/`">
                        <a>{{ post.parent_resub_name }}</a>
                    </router-link>
                </div>

                <EditAndDelete v-if="canEditPost"
                               :delete-action="deletePost"
                               :edit-route="editRoute"
                               :can-edit="canEditPost"/>

                <div class="info">
                    <div class="section-header">{{ post.title }}</div>
                    <div class="content">{{ post.content }}</div>
                </div>

                <div class="comment-input-header">Comment:</div>
                <div class="comment-input">
                    <textarea placeholder="Enter your comment here..." v-model="comment_content"></textarea>
                    <button @click="submitComment(comment_content)">Submit Comment</button>
                </div>
                <div class="empty-space"></div>
            </div>

            <div class="comments" v-if="comments.length">
                <div class="comment-header">Comments</div>
                <div class="comment" v-for="comment in comments" :key="comment.id">
                    <div class="comment-circle">
                        <div>N/A</div>
                    </div>
                    <div class="comment-author">From:
                        <span v-if="comment.author_username">
                    <router-link :to="`/users/${comment.author_username}`">
                        <a>{{ comment.author_username }}</a>
                    </router-link>
                </span>
                        <span v-else-if="loaded">unknown</span>
                    </div>

                    <div v-if="state.currentUser">
                        <div class="comment-edit-delete">
                            <span v-if="canEdit(comment) && !comment.editing" @click="showEdit(comment)" class="edit-comment">Edit</span>
                            <span v-if="canEdit(comment) && comment.editing" @click="cancelEdit(comment)" class="edit-comment">Cancel</span>
                            <span v-if="canEdit(comment)"> - </span>
                            <span @click="deleteComment(comment)" class="delete" v-if="canDelete(comment)">Delete</span>
                            <span v-if="!comment.replying"> - </span>
                            <span @click="showReply(comment)" v-if="!comment.replying" class="reply-button">Reply</span>
                        </div>
                    </div>

                    <div class="comment-info">
                        <div v-if="!comment.editing" class="comment-content">{{ comment.content }}</div>
                        <div v-else class="edit-comment-input">
                            <textarea placeholder="Enter your comment here..." v-model="comment.content"></textarea>
                            <button @click="saveComment(comment)">Edit Comment</button>
                        </div>
                    </div>
                    <div class="reply" v-if="comment.replying">
                        <textarea placeholder="Enter your reply here..." v-model="reply_content"></textarea>
                        <button @click="submitReply(reply_content, comment)" class="button1">Submit Reply</button>
                        <button @click="cancelReply(comment)" class="button2">Cancel</button>
                    </div>

                    <div v-if="comment.replies.length > 0 && resub" class="replies">
                        <div v-for="reply in comment.replies" :key="reply.id">
                            <Reply :replies="comment.replies" :dashes="''" :resub_owner="resub.owner_username"
                               :post_author="post.author_username" :comment="reply"
                               @submit-reply="submitReply"
                               @show-reply="showReply"
                               @cancel-reply="cancelReply"
                               @save-edit="saveComment"
                               @show-edit="showEdit"
                               @cancel-edit="cancelEdit"
                               @delete-reply="deleteComment"></Reply>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comments" v-else-if="loaded">
                <div class="comment-header">No Comments yet!</div>
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
    import Reply from '@/components/Reply';

    export default {
        name: "Post",
        components: {EditAndDelete, Notice, Navbar, Reply},
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
                reply_content: null,
                form: 'none',
                resub: null
            }
        },
        async created () {
            await this.loadData()
            this.loaded = this.$loaded()
        },
        computed: {
            isAuthor() {
                if(this.state.currentUser) {
                    return this.state.currentUser === this.author
                }
                return false
            },
            canEditPost () {
                if(this.resub && this.state.currentUser) {
                    return this.isAuthor || this.state.currentUser.username === this.resub.owner_username
                }
                return false
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
                    this.resub = (await this.$http.get(`/resubs/${this.resubname}/`)).data
                } catch (error) {
                    this.post = null
                    return
                }

                try {
                    this.author = (await this.$http.get(`/users/${this.post.author_username}/`)).data
                } catch (error) {
                    // Ignore and leave this.user as null
                }

                await this.loadComments()
            },
            async loadComments () {
                const commentList = (await this.$http.get(`/posts/${this.post_id}/comments/`)).data
                for(const comment of commentList) {
                    comment.replies = []
                    comment.editing = false
                    comment.replying = false
                    comment.oldContent = ''
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
            async reloadComments () {
                this.comments.splice(0)
                this.replies.splice(0)
                await this.loadComments()
            },
            async deletePost() {
                try {
                   await this.$http.delete(`/posts/${this.post_id}`)
                } catch (error) {
                    // TODO: handle delete error
                }

                await this.$router.push(`/resubs/${this.post.parent_resub_name}/posts/`)
                this.$forceUpdate()
            },
            async submitComment(commentContent) {
                this.$load()
                const data = {
                    content: commentContent
                }

                try {
                    const newComment = (await this.$http.post(`/posts/${this.post_id}/comments/`, data)).data
                    newComment.replies = []
                    newComment.editing = false
                    newComment.replying = false
                    newComment.oldContent = ''
                    this.comments.push(newComment)
                } catch (error) {
                    //TODO send feedback to user
                }

                await this.reloadComments()
                this.$loaded()
            },
            async saveComment(comment) {
                this.$load()
                if(comment.content === '') {
                    return
                }

                const data = {
                    content: comment.content
                }

                try {
                    await this.$http.patch(`/comments/${comment.id}/`, data)
                    comment.editing = false
                } catch (error) {
                    //TODO send feedback to user
                }

                this.$loaded()
            },
            async deleteComment(comment) {
                this.$load()

                try {
                    await this.$http.delete(`/comments/${comment.id}/`)
                } catch (error) {
                    //TODO send feedback to user
                }

                this.comments = this.comments.filter(c => c !== comment)
                await this.reloadComments()
                this.$loaded()
            },
            async submitReply(newReplyContent, toComment) {
                this.$load()
                const data = {
                    content: newReplyContent
                }

                try {
                    const newReply = (await this.$http.post(`/comments/${toComment.id}`, data)).data
                    newReply.replies = []
                    newReply.editing = false
                    newReply.replying = false
                    newReply.oldContent = ''
                    toComment.replies.push(newReply)
                } catch (error) {
                    //TODO send feedback to user
                }

                toComment.replying = false;
                this.$loaded()
            },
            getVoteColor (vote) {
                if (vote > 0) {
                    return 'color: #00ff73';
                } else if (vote < 0) {
                    return 'color: #ff0000';
                }
                return 'color: #ffffff';
            },
            showEdit(comment) {
                comment.oldContent = comment.content
                comment.editing = true;
            },
            cancelEdit(comment) {
                comment.content = comment.oldContent
                comment.editing = false;
            },
            showReply(comment) {
                comment.replying = true;
            },
            cancelReply(comment) {
                comment.replying = false;
            },
            canEdit(comment) {
                return this.state.currentUser.username === comment.author_username
            },
            canDelete(comment) {
                return this.state.currentUser.username === this.author.username || this.state.currentUser.username === comment.author_username
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
        margin-bottom: 12px;
        margin-top: 12px;
    }

    .comment {
        background-color: #2e2e2e;
        width: 100%;
        color: white;
        border-radius: 20px 0 0 0;
        margin-bottom: 12px;
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

    .delete {
        color: #ff0000;
    }

    .delete:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .reply-button {
        color: #45b1ff;
        cursor: pointer;
    }

    .reply-button:hover {
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
        height: 100%;
    }

    .comment-info hr {
        width: 100%;
    }

    .comment-info textarea {
        height: 12px;
    }

    .comment-content {
        font-size: 12px;
    }

    .edit-comment-input {
        position: relative;
        width: 50%;
        margin-left: 2px;
        font-size: 12px;
        height: 100%;
    }

    .edit-comment-input textarea{
        width: 70%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        min-height: 16px;
        height: 100px;
        border: none;
        border-radius: 4px 0 0 4px;
    }

    .edit-comment-input button {
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

    .edit-comment-input button:hover {
        color: white;
    }

    .reply {
        position: relative;
        width: 50%;
    }

    .reply textarea{
        width: 70%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        min-height: 24px;
        height: 24px;
        border: none;
        border-radius: 4px 0 0 4px;
    }

    .reply button {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        width: 30%;
        height: 50%;
        border: none;
        background-color: #242424;
        color: #45b1ff;
        font-family: Consolas, monaco, monospace;
        transition: 0.2s;
        font-size: 12px;
    }

    .reply button:hover {
        color: white;
    }

    .reply .button1 {
        position: absolute;
        top: 0;
        border-radius: 0 4px 0 0;
    }

    .reply .button2 {
        position: absolute;
        bottom: 0;
        border-radius: 0 0 4px 0;
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
</style>