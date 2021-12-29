/*
 * @Date: 2021-11-03 23:08:20
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 11:43:22
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\main.js
 */
import Vue from 'vue'
// 重置css样式
import 'normalize.css/normalize.css'
// 引入全局css
import '@/styles/index.scss'
// 引入字体图标
import '@/icons' // icon
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import './permission'
// 引入插件
import '@/plugins'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
