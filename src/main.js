// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import baseRoutes from './router/base'
import Route from './router/index'
import store from './store'
import ElementUI from 'element-ui'

// css样式文件
import './assets/css/export.scss'
import 'element-ui/lib/theme-chalk/index.css'

// 百度文本编辑器
import '../public/ueditor/ueditor.config.js'
import '../public/ueditor/ueditor.all.js'
import '../public/ueditor/lang/zh-cn/zh-cn.js'

import Tools from './util/tools'
import Util from './util/util'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })

// 初始化路由
Vue.use(VueRouter)
Route.routes = baseRoutes
let routes = Route.initRoutes()
export const router = new VueRouter({ routes })

// 配置tools
const headerConfig = {
  Appkey: '67167560c2424f2c92kxkw3c0af958ch',
  AppSecret: '61ecf6012ff44c79aacw72jddfd96f68'
}
Tools({ Vue, headerConfig })

// 百度编辑器上传图片地址
localStorage.setItem('uploadUrl', Util.uploadURL());

// 路由跳转前
router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('userInfo')
  let path = localStorage.getItem('path')
  if (userInfo || to.path === '/login') {
    if (to.path === '/') {
      return path ? next(path) : next()
    }
    next()
  } else {
    next('/login')
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
