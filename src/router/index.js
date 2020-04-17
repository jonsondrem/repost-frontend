import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import User from '@/views/User';
import Home from "@/views/Home";
import Resub from "@/views/Resub";
import Resubs from "@/views/Resubs";
import Post from "@/views/Post";
import NotFound from "@/views/NotFound"
import CreatePost from "@/views/CreatePost";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home, redirect: ''},
    {path: '/users', component: Home},
    {path: '/login', component: Login},
    {path: '/users/:username', component: User, props: true},
    {path: '/resubs', component: Resubs},
    {path: '/resubs/:resubname/posts', component: Resub, props: true},
    {path: '/resubs/:resubname', redirect: '/resubs/:resubname/posts', component: Resub, props: true},
    {path: '/resubs/:resubname/posts/:post_id', component: Post, props: true},
    {path: '/resubs/:resubname/createpost', component: CreatePost, props: true, name: 'CreatePost'},
    {path: '*', component: NotFound}
];

const router = new VueRouter( {
    mode: 'history',
    routes
})

export default router;