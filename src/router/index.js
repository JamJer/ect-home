import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Trading from '@/components/Trading'
Vue.use(Router)

export default new Router({
  mode: 'history',
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { auth: false } // No need authorization
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: { auth: false } // No need authorization  
    },
    {
      path: '/Trading',
      name: 'Trading',
      component: Trading // Need authorization
    },
    { path: '/*', redirect: '/Main' } // When no url path match, redirect to Main
  ]//
})
