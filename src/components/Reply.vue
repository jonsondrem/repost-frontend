<template>
    <div>
        <div v-for="reply in replies" :key="reply.id">
            <span class="dashes">{{ dashes }}</span><router-link :to="`/users/${reply.author_username}`"><a class="username">{{ reply.author_username }}:</a></router-link>
            <template v-if="!editing"><span class="content">{{ reply.content }}</span></template>
            <template v-else>
                <div class="comment-input">
                    <textarea placeholder="Enter your comment here..." v-model="reply.content"></textarea>
                    <button @click="submitEditedComment(reply)">Edit Comment</button>
                </div>
            </template>
            <a class="reply" @click="replyComment(reply)" v-if="$store.state.currentUser">reply</a>
            <a class="delete" @click="deleteComment(reply)" v-if="isEligible(reply)">delete</a>
            <a class="edit" @click="editComment(reply)" v-if="isReplier(reply) && !editing">edit</a>
            <a class="edit" @click="cancelEditComment(reply)" v-else-if="isReplier(reply) && editing">cancel</a>
            <div class="reply-input" v-if="replying">
                <textarea placeholder="Enter your reply here..." v-model="newReply"></textarea>
                <button @click="submitReply(newReply, reply)" class="button1">Submit Reply</button>
                <button @click="cancelReply" class="button2">Cancel</button>
            </div>
            <div v-if="reply.replies.length > 0" class="new-line">
                <Reply :replies="reply.replies" :dashes="dashes + '->'" :resub_owner="resub_owner" :post_author="post_author"></Reply>
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
            }
        },
        data () {
            return {
                editing: false,
                replying: false,
                oldComment: '',
                newReply: ''
            }
        },
        methods: {
            replyComment() {
                this.replying = true;
            },
            cancelReply() {
                this.replying = false
            },
            async submitReply(newReply, toReply) {
                const data = {
                    content: newReply
                }

                try {
                    this.$http.post(`/comments/${toReply.id}`, data)
                    this.$router.go(0)
                } catch (error) {
                    //TODO send feedback to user
                }
            },
            editComment(reply) {
                this.oldComment = reply.content
                this.editing = true;
            },
            cancelEditComment(reply) {
                reply.content = this.oldComment
                this.editing = false;
            },
            async submitEditedComment(reply) {
                const data = {
                    content: reply.content
                }

                try {
                    this.$http.patch(`/comments/${reply.id}`, data)
                } catch (error) {
                    //TODO send feedback to user
                }

                this.editing = false
            },
            async deleteComment(reply) {
                try {
                    await this.$http.delete(`/comments/${reply.id}/`)
                    await this.$router.go(0)
                } catch (error) {
                    //TODO send feedback to user
                }
            },
            isReplier(reply) {
                if (this.$store.state.currentUser.username) {
                    return reply.author_username === this.$store.state.currentUser.username
                }
                return false
            },
            isEligible(reply) {
                if (this.$store.state.currentUser.username) {
                    return reply.author_username || this.author_username || this.resub_owner === this.$store.state.currentUser.username
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