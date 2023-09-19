import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken()
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
    }
  },
  actions: {
    login(context) {
      // TODO: 发请求
      // 模拟得到了 token
      const token = 123456
      context.commit('setToken', token)
    }
  },
  getters: {}
}
