<template>
    <div class="right">
        <div class="circle">
            <router-link to="/">
                <img src="../assets/Logo.png" alt="logo">
            </router-link>
        </div>
        <div class="form">
            <form class="login_form">
                <label for="username">Username</label><br>
                <input type="text" id="username" name="username" v-model="username" class="field"><br>
                <label for="password">Password</label><br>
                <input type="password" id="password" name="password" v-model="password" class="field"><br>
                <input type="submit" value="Login" @click="login" class="login_button">
            </form>
        </div>
        <div v-show="errored" class="err">Username or password wrong</div>
    </div>
</template>

<script>
    import qs from 'qs';

    export default {
        name: "Login",
        props: {
            propUsername: String,
            redirect: String
        },
        data () {
            return {
                username: this.propUsername || '',
                password: '',
                errored: false,
                from: this.redirect || null
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => vm.from = vm.from || from.path)
        },
        created () {
            this.$loaded()
        },
        methods: {
            async login (e) {
                e.preventDefault();
                this.$load()

                const data = qs.stringify({
                    grant_type: 'password',
                    username: this.username,
                    password: this.password,
                    client_id: process.env.REPOST_CLIENT_ID || 'repost',
                    scope: 'user'
                });

                try {
                    const oauth_token = (await this.$http.post('/auth/token', data)).data
                    this.$store.state.userToken = oauth_token.access_token
                    await this.$router.push(this.from)
                }
                catch (error) {
                    this.errored = true;
                    this.$loaded()
                }
            }
        }
    }
</script>

<style scoped>
    .right {
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

    .err {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        width: 250px;
        background-color: #2e2e2e;
        border-radius: 5px;
        height: 24px;
        margin-top: 8px;
        text-align: center;
        vertical-align: middle;
        color: #ff0000;
    }


</style>