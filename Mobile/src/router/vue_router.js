export default [ // 按照先后顺序排
  {
    path: '/myCurriculum',
    name: 'myCurriculum',
    component: resolve => require(['../components/teacher/MyCurriculum.vue'], resolve),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/coursesList',
    name: 'coursesList',
    component: resolve => require(['../components/student/CoursesList.vue'], resolve),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/classdetail',
    name: 'classdetail',
    component: resolve => require(['../components/student/ClassDetail.vue'], resolve),
    meta: {
      requiresAuth: true
    }
  }
  // {
  //   path: '/entry',
  //   name: '模拟登陆',
  //   component: resolve => require(['../pages/public/Entry.vue'], resolve)
  // },
  // {
  //   path: '*',
  //   name: '未找到',
  //   component: resolve => require(['../pages/public/404.vue'], resolve)
  // }
]
