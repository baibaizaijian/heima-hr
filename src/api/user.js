import request from '@/utils/request'

// 用户登录
export const login = data => request.post('/sys/login', data)

// 获取用户信息
export function getInfo() {
  return request({
    url: '/sys/profile'

  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
