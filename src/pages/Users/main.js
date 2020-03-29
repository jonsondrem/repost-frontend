import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DisplayUser from '@/components/DisplayUser';

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/:username', component: DisplayUser }
];

const router = new VueRouter({
  mode: 'history',
  base: '/users',
  routes
});

new Vue({
  router,
  render (h) {
    return h(App)
  },
  components: { App }
}).$mount('#app')