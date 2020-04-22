<template>
    <div id="app">
        <router-view></router-view>
        <NotificationWrapper/>
    </div>
</template>

<script>
    import NotificationWrapper from "@/components/NotificationWrapper";
    require('@/assets/css/reset.css')
    require('nprogress/nprogress.js')
    require('nprogress/nprogress.css')
    import api from '@/api'

    export default {
        name: "App.vue",
        components: {NotificationWrapper},
        created () {
            this.$http.interceptors.request.use(config => {
                this.$notification({
                    type: 'info',
                    text: `${config.method.toUpperCase()} ${api.apis[this.$store.state.api].url}${config.url}`,
                    duration: 6000
                })
                return config
            })
        }
    }
</script>

<style scoped>

</style>