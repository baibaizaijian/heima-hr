import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // 配置基地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 响应时间
  timeout: 3000

})
// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 使用快捷访问方式
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
// 解构返回数据
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    // 提示用户
    Message.error(message)
    // 抛出错误
    return Promise.reject(new Error(message))
  }
}, function(error) {
  if (error.response.status === 401) {
    // 提示用户
    Message.error('请重新登录')
    // 退出登录
    store.dispatch('user/logout')
    router.push('/login')
  } else { Message.error(error.response.data.message) }
  return Promise.reject(error)
})

export default service
