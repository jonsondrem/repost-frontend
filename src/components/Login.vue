<template>
    <div class="login">
        <form class="login_form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password">
            <input type="submit" value="Login" @click="handleSubmit">
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';

    export default {
        name: "Login.vue",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                let data = qs.stringify({
                    username: this.username,
                    password: this.password
                });
                if (this.password.length > 0) {
                    axios.post('http://127.0.0.1:8000/api/auth/token', data, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        withCredentials: true
                    })
                        .then(function (response) {
                            const token = response.data.access_token;
                            localStorage.setItem('user-token', token);
                            window.location.replace('/')
                        })
                        .catch(function () {
                            localStorage.removeItem('user-token');
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .login {
        position: absolute;
        background-color: #2e2e2e;
        width: 250px;
        left: 50%;
        top: 200px;
        transform: translate(-50%, 0);
        color: white;
        height: 300px;
    }
</style>