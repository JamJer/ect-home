// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
Vue.config.productionTip = false

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta;
  var isLogin = Boolean(store.state.login.token)

  if (auth && !isLogin && path !== '/Login') {
    return next({ path: '/Login' })
  }
  if(isLogin && (path == '/Login' || path == '/Register')){
   return next({ path: '/Trading' })
   }
  next()
});

new Vue({
  el: '#app',
  render: h => h(App),
  template: '<App/>',
  router,
  store
})
