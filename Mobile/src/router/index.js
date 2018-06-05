import Vue from 'vue'
import Router from 'vue-router'
// 路由
import Lost from '@/components/common/404'
import Valide from '@/components/common/Valide'
import CoursesList from '@/components/student/CoursesList'
import ClassDetail from '@/components/student/ClassDetail'
import HeatReport from '@/components/teacher/HeatReport'
import MyCurriculum from '@/components/teacher/MyCurriculum'

Vue.use(Router)

export default new Router({
  routes: [
    // 学生
    {
      path: '/coursesList',
      name: 'coursesList',
      component: CoursesList,
      meta: { requiresAuth: true }
    },
    {
      path: '/classdetail',
      name: 'classDetail',
      component: ClassDetail,
      meta: { requiresAuth: true }
    },
    // 教师
    {
      path: '/heatReport',
      name: 'heatReport',
      component: HeatReport,
      meta: { requiresAuth: true }
    },
    {
      path: '/myCurriculum',
      name: 'myCurriculum',
      component: MyCurriculum,
      meta: { requiresAuth: true }
    },
    // 验证
    {
      path: '/',
      name: 'valide',
      component: Valide
    },
    {
      path: '*',
      name: 'lost',
      component: Lost
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
