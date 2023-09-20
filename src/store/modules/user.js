import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'
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
    async login(context, data) {
      // TODO: 发请求
      const res = await login(data)
      console.log(res)

      context.commit('setToken', res)
    }
  },
  getters: {}
}
