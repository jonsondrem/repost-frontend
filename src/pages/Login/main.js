import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Login from '@/components/Login';

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login, props: true }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')