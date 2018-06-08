import Vue from 'vue'
import VueResource from 'vue-resource'
// import { CONSTELLATTION } from 'assets/config'

Vue.use(VueResource)
const host = '//' + location.host

/**
 * 请求接口
 * @param option {url: 必传, params: 传的参, type: 请求类型}
 * @param callback
 */
const Load = (option) => {
  if (!option || !option.url) {
    alert('接口地址必传，不能没有！')
    return
  }
  option.url = (option.host ? option.host : host) + option.url
  !option.params && (option.params = {})
  !option.type && (option.type = 'get')

  let params = null
  let headers = {}
  if (option.type === 'get') {
    params = {
      params: option.params
    }
  } else if (option.type === 'post' || option.type === 'put') {
    params = JSON.stringify(option.params)
  } else {
    params = option.params
  }
  option.headers && (headers.headers = option.headers)
  return new Promise((resolve, reject) => {
    console.log(1)
    Vue.http[option.type](option.url, params, headers).then(response => {
      console.log(2)
      resolve(response.body)
    }, response => {
      reject(response)
    })
  })
}

/**
 * 解析URL返回GET参数,可以手动传入如:aa=bb&cc=dd
 *
 * @param  {[type]}  purl        地址
 * @param  {Boolean} isNoToLower 是否全部变为小写
 *
 * @return {Object}
 */
const GetUrlParams = (purl, isNoToLower) => {
  isNoToLower = isNoToLower || false
  let url = purl || window.location.href
  let paraObj = {}
  if (url.indexOf('?') < 0) {
    return paraObj
  }
  let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  if (!isNoToLower) {
    for (let i = 0, len = paraString.length; i < len; i++) {
      let one = paraString[i]
      let v = one.substring(one.indexOf('=') + 1, one.length)
      if (!isNaN(Number(v))) {
        v = Number(v)
      }
      paraObj[one.substring(0, one.indexOf('=')).toLowerCase()] = decodeURIComponent(v)
    }
  } else {
    for (let i = 0, len = paraString.length; i < len; i++) {
      let one = paraString[i]
      let v = one.substring(one.indexOf('=') + 1, one.length)
      if (!isNaN(Number(v))) {
        v = Number(v)
      }
      paraObj[one.substring(0, one.indexOf('='))] = v
    }
  }
  return paraObj
}

/**
 * 获取标准数据
 * @param data list列表
 * @returns {{}}
 * @constructor
 */
const GetStandardList = (data) => {
  let res = {}
  for (let i in data) {
    switch (i) {
      case 'pageNo':
      case 'pageSize':
      case 'totalCount':
        res[i] = data[i]
        break
      case 'list':
        res['result'] = data[i] ? data[i] : []
        break
    }
  }
  return res
}

/**
 * 去掉多余的字段
 * @param needFields 需要的字段,数组
 * @param data 原数据对象
 * @constructor
 */
const DeleteMoreFields = (needFields, data) => {
  let tmp
  if (!(needFields instanceof Array)) return '需要的字段不是个数组'
  if (typeof data !== 'object') return '原数据不正确'
  if (data instanceof Array) {
    tmp = []
    data.map(item => {
      let a = {}
      needFields.map(key => {
        if (typeof item[key] !== 'undefined') {
          (a[key] = item[key])
        }
      })
      tmp.push(a)
    })
  } else if (typeof data === 'object') {
    tmp = {}
    needFields.map(key => {
      if (typeof data[key] !== 'undefined') {
        tmp[key] = data[key]
      }
    })
  }
  return tmp
}

/**
 * 将字段处理成string
 * @param needFields
 * @param data 对象
 */
const FieldsToString = (needFields, data) => {
  if (!(needFields instanceof Array)) return '需要的处理的字段不是个数组'
  if (typeof data !== 'object') return '原数据不正确,不能为数组'
  if (data instanceof Array) {
    needFields.map(key => {
      data.map(item => {
        item[key] && (item[key] = JSON.stringify(item[key]))
      })
    })
  } else {
    needFields.map(key => {
      data[key] && (data[key] = JSON.stringify(data[key]))
    })
  }
  return data
}

/**
 * 将字段处理成json对象
 * @param needFields
 * @param data 对象
 */
const FieldsToJson = (needFields, data) => {
  if (!(needFields instanceof Array)) return '需要的处理的字段不是个数组'
  if (typeof data !== 'object') return '原数据不正确,必须是对象'
  if (data instanceof Array) {
    needFields.map(key => {
      data.map(item => {
        item[key] && (item[key] = IsJson(item[key]) || item[key])
      })
    })
  } else {
    needFields.map(key => {
      data[key] && (data[key] = IsJson(data[key]) || data[key])
    })
  }
  return data
}

/**
 * 是否为json字符串
 * @param {*} str
 */
const IsJson = (str) => {
  if (typeof str === 'string') {
    try {
      str = JSON.parse(str)
      return str
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

/**
 * 获取当前日期
 */
const GetCurrentDate = () => {
  const date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth()
  let h = date.getHours()
  let min = date.getMinutes()
  let s = date.getSeconds()
  m = m + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
}
/**
 *  获取当前年份
*/
const GetYear = () => {
  const date = new Date()
  let y = date.getFullYear()
  return y
}

const GetCurrentDateTime = () => {
  const date = new Date()
  let h = date.getHours()
  let m = date.getMinutes()
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  let dateTime = GetCurrentDate()
  dateTime = dateTime + ' ' + h + ':' + m
  return dateTime
}

/**
 * 当前月份第一天
 */
const GetCurrentMonthFirst = () => {
  let date_ = new Date()
  let year = date_.getFullYear()
  let month = date_.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let firsttime = year + '-' + month + '-01'
  return firsttime
}

/**
 * 去掉所有特殊字符
 * @param {*} s
 */
function StripScript (s) {
  let strArr = [
    '\\[', '`~', '!', '@', '#', '\\$', '。', '，', '、', '？', ']',
    '\\^', '&', '\\*', '\\(', '\\)', '=', '|', '{', '}', '_', '-',
    '\'', ':', ';', '<', '>', '/', '\\?', '~', '！', '@', '#', '￥', '……', '&',
    '（', '）', '——', '|', '{', '}', '【', '】', '‘', '；', '：', '”', '“']
  let rs = s
  for (let i = 0, len = strArr.length; i < len; i++) {
    let pattern = new RegExp(strArr[i], 'g')
    rs = rs.replace(pattern, '')
  }
  rs = rs.replace(/\s*/g, '')
  return rs
}

// 获取url用户名和密码
function getQueryId (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return ''
}
/**
 * 获取用户信息，userInfo
*/
// function GetUserInfo () {
//   const userInfo = sessionStorage.getItem('userInfo')
//   if (!userInfo) {
//     if (location.port === '8089') {
//       const info = {
//         'userId': 'QianDuanKaiFa',
//         'name': '测试',
//         'avatar': '',
//         'mobile': '18981783549',
//         'isleader': '',
//         'status': ''
//       }
//       return {userInfo: JSON.stringify(info)}
//     }
//     location.href = '/#/'
//   }
//   return {userInfo: userInfo}
// }

/* eslint-disable no-trailing-spaces */
export { 
  Load, GetUrlParams, GetStandardList, DeleteMoreFields, 
  FieldsToString, FieldsToJson, IsJson, 
  GetCurrentDate, GetCurrentDateTime, StripScript, GetCurrentMonthFirst,
  GetYear, getQueryId
}
