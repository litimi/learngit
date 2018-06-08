/**
 * host判断使用
 */
const ISDEBUG = true // 如果测试环境为true生产环境为false
const HOST = ISDEBUG ? 'api' : 'http://192.168.0.236:6003'
const Hosts = ISDEBUG ? 'tokens' : 'http://192.168.0.193:8765'
export {
  HOST, Hosts
}
