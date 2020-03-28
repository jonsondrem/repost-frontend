<template>
    <div class="logo" id="logo">
        <a href="index.html">
            <img src="../assets/Logo.png" alt="logo">
        </a>
    </div>

    <div class="topnav" id="topnav">
        <a href="resubs/">Resubs</a>
        <a href="users/">Users</a>
        <a href="support.html">Support</a>
        <div class="login" id="login">
            <a v-if="typeof(user) === 'undefined' || user === null" href="login">Login</a>
            <a href="users/me" v-else>{{ user }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar.vue"
    };
    var current_user = new Vue({
        el: '#login',
        data: {
            user: null
        },
        created() {
            fetch('http://127.0.0.1:8000/api/users/me')
                .then(response => response.json())
                .then(json => {
                    this.user = json.username;
                })
        }
    });
</script>

<style scoped>

</style>