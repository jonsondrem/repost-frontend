<template>
    <div class="section">
        <div class="title">
            404
        </div>
        <div class="info">
            The directory you tried to access doesn't exist.
        </div>
        <div class="return">
            Return to <router-link to="/"><a>Home</a></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        created () {
            this.$loaded()
        }
    }
</script>

<style scoped>
    .section {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        text-align: center;
        color: white;
    }

    .title {
        font-size: 96px;
    }

    a {
        color: #45b1ff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>