<template>
    <div id="app">
        <Navbar></Navbar>
        <PostData></PostData>
    </div>
</template>

<script>
    require('@/assets/css/reset.css');

    export default {
        name: "App",
        components: {
            Navbar: () => import('@/components/Navbar.vue'),
            PostData: () => import('@/components/PostData.vue')
        }
    };
</script>

<style scoped>

</style>