import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import api from '@/api'
import store from '@/store'
import NProgress from 'nprogress'
import VueNotificationRenderless from 'vue-notification-renderless'

Vue.config.productionTip = false
Vue.prototype.$http = api.instance
Vue.prototype.$store = store(api.instance)

Vue.prototype.$load = NProgress.start
Vue.prototype.$loaded = () => {
    NProgress.done()
    return true
}

Vue.use(VueNotificationRenderless)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')