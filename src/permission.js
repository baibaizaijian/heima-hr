// 引入路由
import router from './router'
import nprogress from 'nprogress'
// 引入样式
import 'nprogress/nprogress.css'
import store from './store'
import { Message } from 'element-ui'
import { dynamicRoutes } from './router'

// 白名单
const whiteList = ['/login']
// 前置守卫
router.beforeEach(async(to, form, next) => {
  // 开启进度条
  nprogress.start()
  // 判断是否登录
  if (store.getters.token) {
    // 是登录页就强行跳转到首页 (已登录就不要再去登录页了)
    if (to.path === '/login') {
      next('/')
      nprogress.done()// 用于结束页面加载时的进度条动画。
    } else {
      // 判断是否发过请求,获取用户信息
      if (!store.getters.userInfo.userId) {
        await store.dispatch('user/getUserInfo')
        // 获取到当前用户所拥有的权限
        const { roles } = await store.dispatch('user/getUserInfo')
        // 用户拥有的权限
        // console.log(roles.menus)
        // 所有的动态路由
        // console.log(dynamicRoutes)
        // 筛选出当前用户能访问的路由页面
        const filterRoutes = dynamicRoutes.filter(item => {
          // return 布尔值, 决定当前元素是否筛选到新数组中
          return roles.menus.includes(item.name)
        })
        filterRoutes.push({ path: '*', redirect: '/404', hidden: true })
        console.log(filterRoutes)
        // 将筛选出来的路由动态添加到路由系统中
        router.addRoutes(filterRoutes)
        store.commit('user/setRoutes', filterRoutes)
        // 路由官方的 bug 解决方案: 重新定向到目标地点
        if (filterRoutes.some(item => item.path === to.path)) { next(to.path) } else {
          next('/')
        }
      } else {
        // 不能重复调用 next(), 所以加一个 else 即可
        // 放行
        next()
      }
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
