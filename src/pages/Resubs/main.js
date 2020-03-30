import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ResubPostsData from "@/components/ResubPostsData";
import ResubsList from "@/components/ResubsList";

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/resubs/:resubname/posts', component: ResubPostsData, props: true },
  { path: '/resubs', component: ResubsList },
  { path: '/resubs/:resubname', redirect: '/resubs/:resubname/posts', component: ResubPostsData, props: true}
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