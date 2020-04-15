<template>
    <div class="resub-list">
        <Navbar></Navbar>
        <div class="resub-list-header">
            <div>Resub List</div>
        </div>
        <div v-for="(resub, index) in resubs" v-bind:key="index" class="resub-panel">
            <a v-bind:href="'/resubs/' + resub.name + '/posts'" class="resub-link"></a>
            <div class="left">Resub: <span>{{ resub.name }}</span></div>
            <div class="right">Owner: <a v-bind:href="'/users/' + resub.owner_username">{{ resub.owner_username }}</a></div>
            <div class="bottom">Desc: {{ resub.description }}</div>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    export default {
        name: "ResubsList",
        components: {Navbar},
        data: function () {
            return {
                resubs: []
            }
        },
        created() {
            fetch('http://127.0.0.1:8000/api/resubs/')
                .then(response => response.json())
                .then(json => {
                    for (const i in json) {
                        this.resubs.push(json[i])
                    }
                })
        }
    }
</script>

<style scoped>
    .resub-list {
        position: absolute;
        top: 200px;
        left: 35%;
        width: 30%;
    }

    .resub-list-header {
        position: relative;
        background-color: #2e2e2e;
        width: 100%;
        color: #ffffff;
        font-size: 22px;
        height: 50px;
        border-radius: 25px 25px 0 0;
        border: 1px solid #2e2e2e;
    }

    .resub-list-header div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .resub-panel {
        position: relative;
        background-color: #242424;
        width: 100%;
        height: 60px;
        border: 1px solid #2e2e2e;
        transition: 0.2s;
        font-size: 16px;
        color: white;
    }

    .resub-panel:hover {
        filter: brightness(110%);
    }

    .resub-panel .left {
        float: left;
    }

    .resub-panel .left span {
        color: #45b1ff;
    }

    .resub-panel .right {
        float: right;
    }

    .resub-panel .right a {
        position: relative;
        color: #00ff73;
        text-decoration: none;
        z-index: 2;
    }

    .resub-panel .right a:hover {
        text-decoration: underline;
    }

    .resub-panel .bottom {
        clear: both;
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 40px;
    }

    .resub-link {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        outline: none;
    }

</style>