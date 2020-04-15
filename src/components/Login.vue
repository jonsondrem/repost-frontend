<template>
    <div class="login">
        <div class="circle">
            <a href="/">
                <img src="../assets/Logo.png" alt="logo">
            </a>
        </div>
        <div class="form">
            <form class="login_form">
                <label for="username">Username</label><br>
                <input type="text" id="username" name="username" v-model="username" class="field"><br>
                <label for="password">Password</label><br>
                <input type="password" id="password" name="password" v-model="password" class="field"><br>
                <input type="submit" value="Login" @click="handleSubmit" class="login_button">
            </form>
        </div>
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
        border-radius: 5px;
    }

    .circle {
        position: relative;
        height: 110px;
        width: 110px;
        background-color: #242424;
        border-radius: 50%;
        z-index: 1;
        left: 50%;
        transform: translate(-50%);
        top: -55px;
    }

    .circle img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .form {
        position: relative;
        top: -35px;
    }

    .login_form label {
        display: inline-block;
        padding-bottom: 12px;
        padding-left: 24px;
    }

    .login_form .field {
        display: inline-block;
        margin-bottom: 24px;
        margin-left: 24px;
        margin-right: 24px;
        width: 202px;
        border-radius: 2px;
        border-style: none;
        height: 24px;
    }

    .login_button {
        position: relative;
        left: 50%;
        transform: translate(-50%);
        border-radius: 4px;
        border-style: none;
        color: #45b1ff;
        background-color: #242424;
        height: 36px;
        font-weight: bold;
        width: 84px;
        transition: 0.2s;
    }

    .login_button:hover {
        color: white;
    }


</style>