/*
 * @Author: Kadia
 * @Date: 2021-08-29 22:39:25
 * @LastEditors: Kadia
 * @LastEditTime: 2021-09-18 17:14:17
 * @Connect: nefukadia@foxmail.com
 */
import Vue from 'vue';
import Router from 'vue-router';
import Index from '../view/index/index.vue';
import Content from '../view/content/index.vue';
import Message from '../view/message/index.vue';
import Tourist from '../view/tourist/index.vue';
import Links from '../view/links/index.vue';
import About from '../view/about/index.vue';
import Admin from '../view/admin/index.vue';
import Blog from '../view/blog/index.vue';
import Login from '../view/login/index.vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import store from '../store/index';
axios.defaults.baseURL=store.state.baseUrl+store.state.apiAgent;
Vue.use(VueCookies);

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      alias: '/index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/tourist',
      name: 'Tourist',
      component: Tourist
    },
    {
      path: '/links',
      name: 'Links',
      component: Links
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
    }
  ]
});

// 路由拦截器
router.beforeEach(function (to, from, next) {
  document.title = store.state.title;
  if(to.name=='Admin'||to.name=='Blog'){
    axios.request({
      url:'/user/checkToken',
      method:'post',
      data:{
        token:$cookies.get("token")
      },
    }).then(function(res){
      if(res.data.code == store.state.apiSuccessCode){
        next();
      }else{
        next({name:'Login'});
      }
    }).catch(function(){
      next({name:'Login'});
    });
  }else{
    next();
  }
});

export default router