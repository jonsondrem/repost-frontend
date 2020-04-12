<template>
    <div class="login">
        <form action="">
            <label for="username">Username</label>
            <input type="text" id="username" name="username">
            <label for="password">Password</label>
            <input type="text" id="password" name="password">
            <input type="submit" value="Login">
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login.vue"
    }
</script>

<style scoped>
    .login {
        position: absolute;
        background-color: #2e2e2e;
        width: 25%;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 0);
        color: white;
        height: 400px;
    }
</style>