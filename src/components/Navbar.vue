<template>
    <div class="navbar">
        <div class="logo" id="logo">
            <router-link to="/">
                <img src="../assets/Logo.png" alt="logo">
            </router-link>
        </div>

        <div class="topnav" id="topnav">
            <router-link to="/resubs">
                <a>Resubs</a>
            </router-link>
            <router-link to="/support">
                <a>Support</a>
            </router-link>

            <div class="login" id="login">
                <router-link :to="`/users/${user.username}`" v-if="user">
                    <a>{{ user.username }}</a>
                </router-link>
                <router-link to="/login" v-else-if="loaded">
                    <a>Login</a>
                </router-link>
                <select v-model="selectedApiUrl" @change="changeApiUrl">
                    <option v-for="api in apis" :key="api.name" :value="api.url">
                        {{ api.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import 'nprogress/nprogress.js'
    import 'nprogress/nprogress.css'

    export default {
        name: "Navbar",
        data () {
            return {
                user: null,
                apis: api.apis,
                selectedApiUrl: localStorage.apiUrl,
                loaded: false
            }
        },
        async created () {
            await this.loadData()
            this.loaded = true
        },
        methods: {
            async loadData () {
                if (!localStorage.userToken) {
                    return
                }

                this.user = (await this.$http.get('/users/me')).data
            },
            changeApiUrl () {
                localStorage.apiUrl = this.selectedApiUrl
                this.$router.go(0)
            }
        }
    }
</script>

<style scoped>
    /* Logo */
    .logo {
        position: fixed;
        background-color: #242424;
        height: 130px;
        width: 130px;
        border-radius: 50%;
        box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 85px;
        z-index: 4;
    }

    .logo img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    /* Top navigation bar */
    /* Background colour  */
    .topnav {
        position: fixed;
        top: 0;
        left: 65px;
        right: 0;
        background-color: #2e2e2e;
        overflow: hidden;
        box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.2);
        height: 65px;
        z-index: 3;
        padding-left: 65px;
    }

    /* Style the links inside the navigation bar */
    .topnav a {
        float: left;
        color: #45b1ff;
        padding: 6px 16px;
        text-decoration: none;
        font-size: 17px;
        font-weight: bold;
        transition: 0.2s;
    }

    .topnav a:hover {
        color: #ffffff;
    }

    .topnav select {
        position: absolute;
        color: #45b1ff;
        background: none;
        border: none;
        font-size: 17px;
        font-weight: bold;
        transition: 0.2s;
        cursor: pointer;
        font-family: Consolas, monaco, monospace;
        right: 0;
        bottom: 0;
    }

    .topnav select:hover {
        color: #ffffff;
    }

    .topnav select option {
        background-color: black;
        font-size: 17px;
    }

    .right {
        float: right;
    }
</style>