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
import { GetToken, GetUserInfo, GetBaseInfo } from './assets/API/api'
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
// const router = new VueRouter({
//   routers
// })
// let xxdm = JSON.parse(localStorage.getItem('xxdm'))
// let tokens = JSON.parse(localStorage.getItem('token'))
const userInfo = {
  username: '175530180227131304636',
  password: '{MD5}7f84a617cae9dadec8c2c148af02219a'
}

// function getQueryId (name) {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
//   var r = window.location.search.substr(1).match(reg)
//   if (r != null) return unescape(r[2])
//   return ''
// }
// userInfo.username = getQueryId('username')
// userInfo.password = getQueryId('password')
store.dispatch('setUsername', userInfo.username)
store.dispatch('setPassword', userInfo.username)
GetToken(userInfo).then(data => {
  console.log(data)
  var token = ''
  store.dispatch('setToken', data.data)
  if (data.data !== JSON.parse(localStorage.getItem('token'))) {
    console.log(2)
    token = data.data
    localStorage.setItem('token', JSON.stringify(data.data))
  }
  if (token) {
    GetUserInfo({token: token}).then(data => {
      store.dispatch('setLoginInfo', data)
      localStorage.setItem('xxdm', JSON.stringify(data.xxdm))
      localStorage.setItem('username', JSON.stringify(data.name))
      GetBaseInfo({xxdm: data.xxdm, token: token}).then(data => {
        store.dispatch('setBaseInfo', data)
        localStorage.setItem('baseinfo', JSON.stringify(data))
      })
      if (data.type === 4) {
        localStorage.setItem('susercode', data.usercode)
        router.push({path: '/coursesList'})
      } else if (data.type === 3) {
        localStorage.setItem('tusercode', data.usercode)
        router.push({path: '/myCurriculum'})
      } else {
      }
    })
  } else {
    router.push({path: '/*'})
  }
})

// router.beforeEach(function (to, from, next) {
//   console.log(store.state)
//   if (store.state.token) {
//     console.log(1)
//   }
//   const nextRoute = ['classdetail', 'myCurriculum']
//   if (nextRoute.indexOf(to.name) >= 0) {
//     if (store.state.token) {
//       if (store.state.baseInfo.type === 3) {
//         next()
//       } else if (store.state.baseInfo.type === 4) {
//         router.push({name: 'myCurriculum'})
//       }
//     }
//   }
//   next()
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
