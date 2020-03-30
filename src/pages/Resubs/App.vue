<template>
    <div id="app">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    require('@/assets/css/reset.css');

    export default {
        name: "App",
        components: {
            Navbar: () => import('@/components/Navbar.vue')
        }
    }
</script>

<style scoped>

</style>