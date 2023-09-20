// 引入路由
import router from './router'
import nprogress from 'nprogress'
// 引入样式
import 'nprogress/nprogress.css'
import store from './store'
import { Message } from 'element-ui'

// 白名单
const whiteList = ['/login']
// 前置守卫
router.beforeEach(async(to, form, next) => {
  // 开启进度条
  nprogress.start()
  // 判断是否登录
  if (store.getters.token) {
    // 判断是不是去登录页
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      // 判断是否发过请求,获取用户信息
      if (!store.getters.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有登录,但去的是白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      Message.error('请先登录')
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})
