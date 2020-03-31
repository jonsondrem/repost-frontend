<template>
    <div id="app">
        <Navbar></Navbar>
        <HomePostsData></HomePostsData>
    </div>
</template>

<script>
    require('@/assets/css/reset.css');

    export default {
        name: "App",
        components: {
            Navbar: () => import('@/components/Navbar.vue'),
            HomePostsData: () => import('@/components/HomePostsData.vue')
        }
    };
</script>

<style scoped>

</style>