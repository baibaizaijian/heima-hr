import { getToken, removeToken, setToken } from '@/utils/auth'
import { getInfo, login } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    // 用户信息
    userInfo: {},
    routes: constantRoutes // 静态路由的数组
  },
  mutations: {
    setToken(state, token) {
      // 将 token 存储到 state
      state.token = token
      // 将 token 存储到本地
      setToken(token)
    },
    removeToken(state) {
      // 将 state 的 token 清空
      state.token = null
      // 将本地的 token 清空
      removeToken()
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setRoutes(state, newRoutes) {
      state.routes = [...constantRoutes, ...newRoutes] // 静态路由 + 动态路由
    },
    resetRoutes(state) {
      state.routes = constantRoutes
    }
  },
  actions: {
    async login(context, data) {
      // TODO: 发请求
      const res = await login(data)
      console.log(res)
      context.commit('setToken', res)
    },
    async getUserInfo(context) {
      const userInfo = await getInfo()
      // console.log(userInfo)
      context.commit('setUserInfo', userInfo)
      return userInfo
    },
    // 退出登录
    logout(context) {
      context.commit('removeToken')// 删除token
      context.commit('setUserInfo', {})// 设置用户对象为空
      context.commit('resetRoutes')
      resetRouter()// 重置路由
    }
  },
  getters: {}
}
