<template>
    <div class="section">
        <div class="title">
            Unauthorized
        </div>
        <div class="info">
            <template v-if="!state.currentUser">
                You must be logged in to interact with this resource
            </template>
            <template v-else>
                You are not authorized to interact with this resource
            </template>
        </div>
        <div class="return">
            Return to <router-link to="/"><a>Home</a></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Unauthorized",
        data () {
            return {
                state: this.$store.state
            }
        },
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