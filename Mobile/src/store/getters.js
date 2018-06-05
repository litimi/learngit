// export function getLoginInfo (state) {
//   return state.loginInfo
// }
// export function getToken (state) {
//   return state.token
// }
const getBaseInfo = (state) => {
  return state.baseInfo
}
const getToken = (state) => {
  return state.token
}
const getLoginInfo = (state) => {
  return state.loginInfo
}
const getUsername = (state) => {
  return state.username
}
const getPassword = (state) => {
  return state.password
}
export {
  getBaseInfo, getToken, getLoginInfo, getUsername, getPassword
}
