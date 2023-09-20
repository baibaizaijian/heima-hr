// 引入路由
import router from './router'
import nProgress from 'nprogress'
// 引入样式
import 'nprogress/nprogress.css'

// 前置守卫
router.beforeEach((to, form, next) => {
  // 开启进度条
  nProgress.start()
  next()
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nProgress.done()
})
