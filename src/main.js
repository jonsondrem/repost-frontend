import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import api from '@/api'
import NProgress from 'nprogress'

Vue.config.productionTip = false
Vue.prototype.$http = api

Vue.prototype.$load = NProgress.start
Vue.prototype.$loaded = () => {
    NProgress.done()
    return true
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')