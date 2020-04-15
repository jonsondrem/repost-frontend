import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import API from '@/api'

Vue.config.productionTip = false

Vue.prototype.$http = API;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')