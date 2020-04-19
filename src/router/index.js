import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import User from '@/views/User';
import Home from "@/views/Home";
import Resub from "@/views/Resub";
import Resubs from "@/views/Resubs";
import Post from "@/views/Post";
import NotFound from "@/views/NotFound"
import PostForm from "@/views/PostForm";
import ResubForm from "@/views/ResubForm";
import NProgress from 'nprogress'

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home, redirect: ''},
    {path: '/users', component: Home},
    {path: '/login', component: Login},
    {path: '/users/:username', component: User, props: true},
    {path: '/resubs', component: Resubs},
    {path: '/resubs/create', component: ResubForm},
    {path: '/resubs/:resubname/posts', component: Resub, props: true},
    {path: '/resubs/:resubname', redirect: '/resubs/:resubname/posts', component: Resub, props: true},
    {path: '/resubs/:resubname/edit', component: ResubForm, props: true, name: 'EditResub'},
    {path: '/resubs/:resubname/posts/create', component: PostForm, props: true},
    {path: '/resubs/:resubname/posts/:post_id', component: Post, props: true},
    {path: '/resubs/:resubname/posts/:post_id/edit', component: PostForm, props: true, name: 'EditPost'},
    {path: '*', component: NotFound}
];

const router = new VueRouter( {
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (!NProgress.isStarted() && to.path) {
        NProgress.start()
    }
    next()
})

export default router;