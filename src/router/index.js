import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import DisplayUser from '@/components/DisplayUser';
import HomePostsData from "@/components/HomePostsData";
import ResubPostsData from "@/components/ResubPostsData";
import ResubsList from "@/components/ResubsList";
import DisplayPost from "@/components/DisplayPost";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: HomePostsData, redirect: ''},
    {path: '/login', component: Login},
    {path: '/users/:username', component: DisplayUser, props: true},
    {path: '/users', component: HomePostsData},
    {path: '/resubs/:resubname/posts', component: ResubPostsData, props: true},
    {path: '/resubs', component: ResubsList},
    {path: '/resubs/:resubname', redirect: '/resubs/:resubname/posts', component: ResubPostsData, props: true},
    {path: '/resubs/:resubname/posts/:post_id', component: DisplayPost, props: true}
];

const router = new VueRouter( {
    mode: 'history',
    routes
})

export default router;