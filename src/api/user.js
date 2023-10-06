import request from '@/utils/request'

// 用户登录
export const login = data => request.post('/sys/login', data)

// 获取用户信息
export function getInfo() {
  return request({
    url: '/sys/profile'

  })
}

export function updatePass(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
export function getUserDetailById(id) {
  return request({
    url: `/salarys/modify/${id}`,
    method: 'get'
  })
}
