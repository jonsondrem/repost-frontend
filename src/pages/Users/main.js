import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DisplayUser from '@/components/DisplayUser';
import HomePostsData from "@/components/HomePostsData";

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/users/:username', component: DisplayUser, props: true },
  { path: '/users', component: HomePostsData }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render (h) {
    return h(App)
  },
  components: { App }
}).$mount('#app')