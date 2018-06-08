import { HOST, Hosts } from '../config'
import { Load } from '../js/common'
// import store from '../../store/store'

const Host = HOST
const hosts = Hosts
// const xxdm = JSON.parse(localStorage.getItem('xxdm'))
// const base = JSON.parse(localStorage.getItem('baseinfo'))
// const xh = JSON.parse(localStorage.getItem('susercode'))
// const xqdm = base.xq
// const xndm = base.xn
// 获取token
const GetToken = (params) => {
  const options = {
    host: hosts,
    url: '/api/auth/jwt/token',
    type: 'post',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取用户信息
const GetUserInfo = (params) => {
  const options = {
    host: hosts,
    url: '/api/admin/user/front/info',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取当前学期学年，基础数据
const GetBaseInfo = (params) => {
  const options = {
    host: hosts,
    url: '/api/base/jcXndm/getDqxnxq',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取可选课程列表
const GetListOptionalCourse = (params) => {
  // params.xh = xh
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/listOptionalCourse',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取已选课程列表
const GetListSelectedCourse = (params) => {
  // params.xh = xh
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/listSelectedCourse',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取课程详情
const GetCourseDetails = (params) => {
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xh = xh
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/courseDetail',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取课程类型
const GetCoursesType = (params) => {
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/courseTypes',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 更新课程点击量
const PostCourseClick = (params) => {
  // params.xh = xh
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/coursepv',
    type: 'put',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 选课
const PostSelectCourse = (params) => {
  // params.xh = xh
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/selectCourse',
    type: 'post',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 退选选课
const PutUnSelectCourse = (params) => {
  // params.xh = xh
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/unSelectCourse',
    type: 'put',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取选课规则
const GetSelectCourseRule = (params) => {
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/selectCourseRule',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取教师课程列表
const GetCoursesList = (params) => {
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/listTeacherCourse',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

// 获取热度报告
const GetHotReport = (params) => {
  // params.xqdm = xqdm
  // params.xndm = xndm
  // params.xxdm = xxdm
  const options = {
    host: Host,
    url: '/mobile/xkxt/hotReport',
    params: params
  }
  return new Promise((resolve, reject) => {
    Load(options).then(data => {
      resolve(data)
    })
  })
}

export {
  GetCourseDetails, GetCoursesList, GetCoursesType, PostCourseClick,
  GetHotReport, GetListOptionalCourse, GetListSelectedCourse, PostSelectCourse,
  GetSelectCourseRule, PutUnSelectCourse, GetToken, GetUserInfo, GetBaseInfo
}
