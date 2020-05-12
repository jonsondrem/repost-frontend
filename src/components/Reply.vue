<template>
    <div>
        <span class="dashes">{{ dashes }}</span>
        <router-link :to="`/users/${comment.author_username}`"><a class="username">{{ comment.author_username }}:</a>
        </router-link>
        <template v-if="!comment.editing"><span class="content">{{ comment.content }}</span></template>
        <template v-else>
            <div class="comment-input">
                <textarea placeholder="Enter your comment here..." v-model="comment.content"></textarea>
                <button @click="saveEdit(comment)">Edit Comment</button>
            </div>
        </template>
        <a class="reply" @click="showReply(comment)" v-if="$store.state.currentUser && !comment.editing">reply</a>
        <a class="delete" @click="deleteComment(comment)" v-if="isEligible(comment)">delete</a>
        <a class="edit" @click="showEdit(comment)" v-if="isReplier(comment) && !comment.editing">edit</a>
        <a class="edit" @click="cancelEdit(comment)" v-else-if="isReplier(comment) && comment.editing">cancel</a>
        <div class="reply-input" v-if="comment.replying">
            <textarea placeholder="Enter your reply here..." v-model="newReply"></textarea>
            <button @click="submitReply(newReply, comment)" class="button1">Submit Reply</button>
            <button @click="cancelReply(comment)" class="button2">Cancel</button>
        </div>
        <div v-if="comment.replies.length > 0" class="new-line">
            <div v-for="reply in comment.replies" :key="reply.id">
                <Reply :replies="comment.replies" :dashes="dashes + '->'" :resub_owner="resub_owner"
                       :post_author="post_author" :comment="reply"
                       @show-reply="showReply"
                       @cancel-reply="cancelReply"
                       @show-edit="showEdit"
                       @cancel-edit="cancelEdit"
                       @delete-reply="deleteComment"></Reply>
                <div class="new-line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Reply",
        props: {
            replies: {
                type: Array,
                default: null,
                required: true
            },
            dashes: {
                type: String,
                default: '',
                required: true
            },
            post_author: {
                type: String,
                default: '',
                required: true
            },
            resub_owner: {
                type: String,
                default: '',
                required: true
            },
            comment: {
                type: Object,
                default: null,
                required: true
            }
        },
        data () {
            return {
                oldComment: '',
                newReply: ''
            }
        },
        methods: {
            showReply(reply) {
                this.$emit('show-reply', reply)
                this.$forceUpdate()
            },
            cancelReply(reply) {
                this.$emit('cancel-reply', reply)
                this.$forceUpdate()
            },
            async submitReply(content, reply) {
                this.$load()
                const data = {
                    content: content
                }

                try {
                    const newReply = (await this.$http.post(`/comments/${reply.id}`, data)).data
                    newReply.replies = []
                    newReply.editing = false
                    newReply.replying = false
                    newReply.oldContent = ''
                    reply.replies.push(newReply)
                } catch (error) {
                    return
                }

                reply.replying = false;
                this.$loaded()
                this.$forceUpdate()
            },
            showEdit(reply) {
                this.$emit('show-edit', reply)
                this.$forceUpdate()
            },
            cancelEdit(reply) {
                this.$emit('cancel-edit', reply)
                this.$forceUpdate()
            },
            async saveEdit(reply) {
                this.$load()
                if(reply.content === '') {
                    return
                }

                const data = {
                    content: reply.content
                }

                try {
                    await this.$http.patch(`/comments/${reply.id}/`, data)
                    reply.editing = false
                } catch (error) {
                    return
                }

                this.$loaded()
                this.$forceUpdate()
            },
            deleteComment(reply) {
                this.$emit('delete-reply', reply)
                this.$forceUpdate()
            },
            isReplier(reply) {
                if (this.$store.state.currentUser) {
                    return reply.author_username === this.$store.state.currentUser.username
                }
                return false
            },
            isEligible(reply) {
                if (this.$store.state.currentUser) {
                    return (reply.author_username === this.$store.state.currentUser.username ||
                        this.author_username === this.$store.state.currentUser.username ||
                        this.resub_owner === this.$store.state.currentUser.username)
                }
                return false
            }
        }
    }
</script>

<style scoped>
    .dashes {
        float: left;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .content {
        margin-left: 6px;
    }

    .username {
        text-decoration: none;
        color: #00ff73;
        float: left;
    }

    .comment-input {
        position: relative;
        width: 50%;
        float: left;
        margin-left: 6px;
    }

    .comment-input textarea{
        width: 70%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        min-height: 12px;
        height: 12px;
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

    .edit {
        display: inline-block;
        float: right;
        color: white;
        cursor: pointer;
        margin-right: 6px;
    }

    .delete {
        display: inline-block;
        float: right;
        color: #ff0000;
        cursor: pointer;
        margin-right: 6px;
    }

    .reply {
        display: inline-block;
        float: right;
        color: #45b1ff;
        cursor: pointer;
        margin-right: 6px;
    }

    .reply-input {
        position: relative;
        width: 50%;
    }

    .reply-input textarea{
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

    .reply-input button {
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
    }

    .reply-input button:hover {
        color: white;
    }

    .reply-input .button1 {
        position: absolute;
        top: 0;
        border-radius: 0 4px 0 0;
    }

    .reply-input .button2 {
        position: absolute;
        bottom: 0;
        border-radius: 0 0 4px 0;
    }

    .new-line {
        clear: both;
    }
</style>