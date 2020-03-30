<template>
    <div class="navbar">
        <div class="logo" id="logo">
            <a href="/">
                <img src="../assets/Logo.png" alt="logo">
            </a>
        </div>

        <div class="topnav" id="topnav">
            <a href="/resubs">Resubs</a>
            <a href="/support">Support</a>
            <div class="login" id="login">
                <a v-if="typeof(user) === 'undefined' || user === null" href="login">Login</a>
                <a href="users/me" v-else>{{ user }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data: function () {
            return {
                user: null
            }
        },
        created() {
            fetch('http://127.0.0.1:8000/api/users/me')
                .then(response => response.json())
                .then(json => {
                    this.user = json.username;
                })
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
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        font-weight: bold;
        transition: 0.2s;
    }

    .topnav a:hover {
        color: #ffffff;
    }

    .login {
        float: right;
    }
</style>