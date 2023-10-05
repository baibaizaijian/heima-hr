
const getters = {
  // 快捷访问
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username,
  userInfo: state => state.user.userInfo,
  routes: state => state.user.routes
}
export default getters
