<template>
    <span>
        <span v-for="reply in replies" :key="reply.id">
            {{ dashes }}<router-link :to="`/users/${reply.author_username}`"><a class="username">{{ reply.author_username }}:</a></router-link> {{ reply.content }}
            <a class="reply">reply</a>
            <div v-if="reply.replies.length > 0">
                <Reply :replies="reply.replies" :dashes="dashes + '->'"></Reply>
            </div>
        </span>
    </span>
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
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .username {
        text-decoration: none;
        color: #00ff73;
    }

    .reply {
        display: inline-block;
        float: right;
        color: #45b1ff;
        cursor: pointer;
    }
</style>