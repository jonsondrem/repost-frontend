<template>
    <div class="notice">
        <div class="title" v-html="title"></div>
        <div class="description">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Notice',
        props: {
            title: String
        }
    }
</script>
<style scoped>

    .notice {
        position: absolute;
        background-color: #2e2e2e;
        width: 40%;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 50%);
        color: white;
    }

    .title {
        font-size: 22px;
        font-weight: bold;
        text-align: center;
    }

    .description {
        text-align: center;
        padding-top: 16px;
        padding-bottom: 12px;
        font-size: 12px;
    }

    p {
        margin-bottom: 1em;
        font-size: 11pt;
    }

    a {
        color: #45b1ff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>