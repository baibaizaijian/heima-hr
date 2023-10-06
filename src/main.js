import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 全局注册按钮级权限控制的指令
Vue.directive('perm', {
  // 当指令被绑定的元素插入到 DOM 树上时自动执行
  // 参数1: el 指令绑定的元素
  // 参数2: binding 指令相关的参数
  inserted(el, binding) {
    // 当前用户所有的权限
    // console.log(store.getters.userInfo?.roles?.points)
    // console.log(el, binding.value)
    if (!store.getters.userInfo?.roles?.points?.includes(binding.value)) {
      // 当前用户没有指定的权限: 干掉当前元素
      el.remove()
    }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
