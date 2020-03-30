import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DisplayUser from '@/components/DisplayUser';
import PostData from "@/components/PostData";

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/users/:username', component: DisplayUser, props: true },
  { path: '/users', component: PostData }
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