<template>
  <div class="curriculum">
    <teacher-tab-nav class="nav" :dataSource="tab" @choose="choose"></teacher-tab-nav>
    <div>
      <div v-if="show">
        <hot-report :data="hotlist" :show="show"></hot-report>
        <!--  v-if="!hotlist.length" -->
        <!-- <info-null v-else :show="show"></info-null> -->
      </div>
      <div class="listbox" v-else>
        <div v-if="listInfo.length" class="infobox">
          <my-curriculum-item v-for="(items, index) in listInfo" :key="index" :dataSource="items"></my-curriculum-item>
        </div>
        <info-null v-else :name="3"></info-null>
      </div>
    </div>
  </div>
</template>
<script>
import MyCurriculumItem from '../common/MyCurriculumItem'
import InfoNull from '../common/InfoNull'
import TeacherTabNav from '../common/TeacherTabNav'
import { GetCoursesList, GetHotReport } from '../../assets/API/api'
import HotReport from '../common/HotReport'
export default {
  name: 'MyCurriculum',
  components: {
    MyCurriculumItem, InfoNull, TeacherTabNav, HotReport
  },
  data () {
    return {
      tab: [
        {CategoryName: '我的课程', IsSelect: true},
        {CategoryName: '热度报告', IsSelect: false}
      ],
      listInfo: [],
      hotlist: [],
      show: false,
      isinfo: false,
      zgh: JSON.parse(localStorage.getItem('tusercode'))
    }
  },
  mounted () {
    this.getcourseslist()
  },
  methods: {
    // 获取教师课程列表
    getcourseslist () {
      let params = {
        // xxdm: '1755',
        // xndm: '2017-2018',
        // xqdm: '02',
        zgh: this.zgh
      }
      GetCoursesList(params).then(data => {
        this.listInfo = data.data
      })
    },
    // 获取热度报告
    gethotreport () {
      let params = {
        // xxdm: '1755',
        // xndm: '2017-2018',
        // xqdm: '02',
        zgh: this.zgh
      }
      GetHotReport(params).then(data => {
        this.hotlist = data.data
      })
    },
    // tab切换
    choose (index) {
      if (index === 0) {
        this.show = false
        this.getcourseslist()
      } else {
        this.show = true
        this.gethotreport()
      }
      // console.log(index)
    }
  }
}
</script>
<style lang="less" scoped>
  .curriculum{
    width: 100%;
    overflow: hidden;
    .nav{
      position: fixed;
      top: 0rem;
    }
    .listbox{
      width: 100%;
      margin-top: 4rem;
      .infobox{
        background: #eff1f3;
      }
    }
  }
</style>
