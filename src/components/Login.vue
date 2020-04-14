<template>
    <div class="login">
        <form class="login_form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username">
            <label for="password">Password</label>
            <input type="text" id="password" name="password" v-model="password">
            <input type="submit" value="Login" @click="handleSubmit">
        </form>
    </div>
</template>

<script>
    import Vue from 'vue';

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
                e.preventDefault()
                if (this.password.length > 0) {
                    Vue.http.post('http://127.0.0.1:8000/api/auth/token', {
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                            localStorage.setItem('jwt', response.data.token)

                            if (localStorage.getItem('jwt') != null) {
                                this.$emit('loggedIn')
                                this.$router.push('')
                            }
                        })
                        .catch(function (error) {
                            console.error(error.response);
                        });
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