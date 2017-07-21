// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/js/base'
import '@/filter'
import 'common/css/index'
import vueLayLoad from 'vue-lazyload';
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
Vue.use(vueLayLoad, {
  loading: require('common/img/logo@3x.png')
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
