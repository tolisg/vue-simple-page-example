import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/views/HomePage/HomePage.vue';
import NotFoundPage from '@/views/NotFoundPage/NotFoundPage.vue';
import Default from '@/views/Layouts/Default/Default.vue';
import Login from '@/views/Layouts/Login/Login.vue';

Vue.component('default-layout', Default);
Vue.component('login-layout', Login);

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      layout: 'default',
      requiresAuth: true // Change this to false in order login is not required
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue'),
    meta: {
      layout: 'login',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Register/Register.vue'),
    meta: {
      layout: 'login',
      requiresAuth: false
    }
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: {
      layout: 'login',
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
