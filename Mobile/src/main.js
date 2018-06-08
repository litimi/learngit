// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Vuex from 'vuex'
import store from './store/store'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/common.css'
import VueLazyload from 'vue-lazyload'
import LazyRender from 'vue-lazy-render'
// import { GetToken, GetUserInfo, GetBaseInfo } from './assets/API/api'
//  GetUserInfo, GetBaseInfo
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(LazyRender)
// Vue.use(Vuex)
Vue.use(VueLazyload, {
  error: './assets/images/error.png',
  loading: './assets/images/loading.gif'
})
Vue.use(MintUI)

FastClick.attach(document.body)
Vue.http.interceptors.push((request, next) => {
  // 登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN = localStorage.getItem('token')
  // let TOKEN = store.state.token
  if (TOKEN) {
    // alert(1)
    // 如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('Authorization', TOKEN)
  }
  next((response) => {
    return response
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
