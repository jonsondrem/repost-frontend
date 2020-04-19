<template>
    <div class="navbar">
        <div class="logo" id="logo">
            <router-link to="/">
                <img src="../assets/Logo.png" alt="logo">
            </router-link>
        </div>

        <div class="topnav" id="topnav">
            <div class="left">
                <router-link to="/resubs" class="nav-button">Resubs</router-link>
                <router-link to="/support" class="nav-button">Support</router-link>
            </div>

            <div class="right" id="login">
                <router-link :to="`/users/${user.username}`" v-if="user" class="nav-button">{{ user.username }}</router-link>
                <template v-else-if="loaded">
                    <router-link to="/login" class="nav-button">Login</router-link>
                    <router-link to="/signup" class="nav-button">Sign Up</router-link>
                </template>
                <select v-model="selectedApiUrl" @change="changeApiUrl" class="nav-button">
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
            this.user = await this.$store.getCurrentUser()
            this.loaded = true
        },
        methods: {
            changeApiUrl () {
                this.$store.logout()
                this.$store.state.apiUrl = this.selectedApiUrl
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
    .nav-button {
        display: inline-block;
        padding: 24px 12px;
        color: #45b1ff;
        font-family: Consolas, monaco, monospace;
        font-size: 17px;
        font-weight: bold;
        transition: 0.2s;
    }

    .nav-button:hover {
        color: #ffffff;
    }

    .topnav a {
        text-decoration: none;
    }

    .topnav select {
        background: none;
        border: none;
        cursor: pointer;
        padding-right: 0;
        margin-right: 12px;
    }

    .topnav select option {
        background-color: black;
        font-size: 17px;
    }

    .topnav .left {
        float: left;
    }

    .topnav .right {
        float: right;
    }
</style>