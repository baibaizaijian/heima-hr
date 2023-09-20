import Cookies from 'js-cookie'

const TokenKey = 'HR_token'
// 存储token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 读写token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
