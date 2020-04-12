<template>
    <div id="app">
        <Login></Login>
    </div>
</template>

<script>
    require('@/assets/css/reset.css');

    export default {
        name: "App",
        components: {
            Login: () => import('@/components/Login.vue')
        }
    }
</script>

<style scoped>

</style>