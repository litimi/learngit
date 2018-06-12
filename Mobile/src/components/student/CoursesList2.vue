<template>
  <div class="student">
    <!-- 头部卡片beg -->
    <div class="topcard">
      <div class="header">
        <img src="../../assets/images/Leaf.png" alt="" class="decorate">
        <div class="userheader">
          <img src="../../assets/images/userheader.png" alt="">
        </div>
      </div>
      <ul class="cardinfo">
        <h2>{{name}},最多可选<span>{{courserule.maxCourseNumber}}</span>门课程</h2>
        <div class="rowStartNoWarp">
          <p v-for="(item, index) in courserule.requiredCourseList" :key="index">{{item.courseName}}课程必选{{item.number}}门</p>
        </div>
      </ul>
    </div>
    <!-- 头部卡片end -->
    <!-- 内容区包含导航搜索beg -->
    <div class="tab" ref="tab" :class="tabfixed === true? 'isfixed' : ''">
      <student-tab :dataSource="tab" @choose="choose" @search="search" @cancel="cancel"></student-tab>
    </div>
    <div class="curriculumlist" v-if="!issaerch">
      <div v-if="CourseListVO.length">
        <folding-panel v-for="(item, index) in CourseListVO" :key="index" :data="item" :isindex="index" :ischoose="ischoose" @signup="signup" ref="card">
        </folding-panel>
      </div>
      <div v-else>
        <info-null :name="1" :ischoose="ischoose"></info-null>
      </div>
    </div>
    <div class="curriculumlist" v-if="issaerch">
      <div v-if="searchlist.length">
        <div class="detailbox colStartNoWarp" v-for="(datas, index) in searchlist" :key="index">
          <div @click="enterdetail(datas.courseId)" class="listitem">
            <div class="rowStartNoWarp name"><h2>{{datas.courseName}}</h2><span v-if="datas.remainCount === '0'">已约满</span></div>
            <div class="detailinfo rowBetweenNoWarp">
              <div class="detailinfoleft">
                <div class="rowStartNoWarpStart">
                  <img src="../../assets/images/teacher.png" alt="">
                  <p>{{datas.teacherName}}</p>
                </div>
                <div class="rowStartNoWarpStart">
                  <img src="../../assets/images/time.png" alt="">
                  <p>{{datas.classTime}}</p>
                </div>
              </div>
              <div class="colStartNoWarp remaincount">
                <h1>{{datas.remainCount}}</h1>
                <span v-if="datas.remainCount">剩余名额</span>
                <span v-else>暂无报名</span>
              </div>
            </div>
          </div>
          <div class="signbtn rowEndNoWarp">
            <div @click.stop="signup(datas, index)" :class="{active: datas.remainCount === '0'&&ischoose === false}">{{ischoose? '退选' : '立即报名'}}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <info-null :name="2"></info-null>
      </div>
    </div>
  </div>
</template>

<script>
import FoldingPanel from '../common/FoldingPanel'
import InfoNull from '../common/InfoNull'
import StudentTab from '../common/StudentTab'
import { GetListOptionalCourse, GetListSelectedCourse, GetSelectCourseRule, PostSelectCourse, PutUnSelectCourse, PostCourseClick } from '../../assets/API/api'
import { Toast } from 'mint-ui'
export default {
  name: 'CoursesList2',
  components: {
    FoldingPanel, StudentTab, InfoNull
  },
  data () {
    return {
      tab: [
        {CategoryName: '可选课程', IsSelect: true},
        {CategoryName: '已选课程', IsSelect: false}
      ],
      show: true,
      courserule: {},
      value: '3333',
      selected: 1,
      name: String,
      total: '5',
      info: '音乐类课程必选2门，人文艺术类课程必选3门',
      CourseListVO: [],
      ischoose: false,
      tabfixed: false,
      searchlist: [],
      issaerch: false,
      xxdm: Number,
      xh: Number,
      xqdm: Number,
      xndm: String
    }
  },
  mounted () {
    this.xxdm = this.$route.query.xxdm
    this.xqdm = this.$route.query.xqdm
    this.xndm = this.$route.query.xndm
    this.xh = this.$route.query.xh
    this.name = this.$route.query.name
    this.getlistoptionalcourse()
    let parmas = {
      xqdm: this.xqdm,
      xndm: this.xndm,
      xxdm: this.xxdm
    }
    GetSelectCourseRule(parmas).then(data => {
      console.log(data)
      if (data.status === 200) {
        this.courserule = data.data
      }
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  props: {
    baseinfo: Object,
    xxDm: String
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if (this.$refs.tab) {
        if (scrollTop > this.$refs.tab.offsetTop) {
          this.tabfixed = true
        } else {
          this.tabfixed = false
        }
      }
    },
    // 更新课程点击量
    updateclick (courseId) {
      let params = {
        kcdm: courseId,
        xh: this.xh,
        xndm: this.xndm,
        xqdm: this.xqdm,
        xxdm: this.xxdm
      }
      PostCourseClick(params).then(data => {
        // console.log(data)
      })
    },
    // 进入详情页
    enterdetail (courseId) {
      // console.log(courseId)
      this.updateclick(courseId)
      this.$router.push({path: '/classdetail', query: {courseId: courseId}})
    },
    // 取消
    cancel (show) {
      this.issaerch = show
      this.searchlist = []
    },
    // 搜索
    search (searchKey, show) {
      this.searchlist = []
      if (searchKey) {
        this.issaerch = show
      } else {
        this.issaerch = false
      }
      var arr = []
      this.CourseListVO.forEach(items => {
        items.courseList.forEach(item => {
          arr.push(item)
        })
      })
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].courseName.indexOf(searchKey) >= 0) {
          this.searchlist.push(arr[i])
        }
      }
      // console.log(this.searchlist)
    },
    // tab切换
    choose (index) {
      if (index === 0) {
        this.ischoose = false
        this.getlistoptionalcourse()
      } else {
        this.ischoose = true
        this.getlistselectedcourse()
      }
    },
    // 获取可选课列表
    getlistoptionalcourse () {
      let parmas = {
        xqdm: this.xqdm,
        xndm: this.xndm,
        xxdm: this.xxdm,
        xh: this.xh
      }
      GetListOptionalCourse(parmas).then(data => {
        console.log(data)
        this.CourseListVO = data.data
      })
    },
    // 获取已选课列表
    getlistselectedcourse () {
      let parmas = {
        xqdm: this.xqdm,
        xndm: this.xndm,
        xxdm: this.xxdm,
        xh: this.xh
      }
      GetListSelectedCourse(parmas).then(data => {
        console.log(data)
        this.CourseListVO = data.data
      })
    },
    // 选课
    postselectcourse (courseId, index) {
      console.log(courseId)
      let XkxtXsxk = {
        kcdm: courseId,
        xqdm: this.xqdm,
        xndm: this.xndm,
        xxdm: this.xxdm,
        xh: this.xh
      }
      PostSelectCourse(XkxtXsxk).then(data => {
        console.log(data)
        if (data.status === 200) {
          this.getlistoptionalcourse()
          Toast({
            message: '选课成功',
            position: 'middle',
            duration: 1000
          })
          if (this.issaerch) {
            this.searchlist[index].remainCount -= 1
          }
        } else if (data.status === -10) {
          Toast({
            message: data.message,
            position: 'middle',
            duration: 1000
          })
        }
      })
    },

    // 退选课程
    putunselectcourse (courseId, index) {
      // console.log(courseId)
      let XkxtXsxk = {
        kcdm: courseId,
        xqdm: this.xqdm,
        xndm: this.xndm,
        xxdm: this.xxdm,
        xh: this.xh
      }
      PutUnSelectCourse(XkxtXsxk).then(data => {
        console.log(data)
        if (data.status === 200) {
          this.getlistselectedcourse()
          Toast({
            message: '退选成功',
            position: 'middle',
            duration: 1000
          })
          if (this.issaerch) {
            this.searchlist.splice(index, 1)
            // [index].remainCount = JSON.parse(this.searchlist[index].remainCount) + 1
          }
        } else if (data.status < 0) {
          Toast({
            message: data.message,
            position: 'middle',
            duration: 1000
          })
        }
      })
    },
    // 选课/退选按钮
    signup (datas, index) {
      if (this.ischoose) {
        this.putunselectcourse(datas.courseId, index)
      } else {
        if (datas.remainCount === '0') {
          Toast({
            message: '课程已选满！',
            position: 'middle',
            duration: 1000
          })
        } else {
          this.postselectcourse(datas.courseId, index)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.student{
  padding-top: 0;
  font-size: 1rem;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background:url(../../assets/images/back.png);
  background-size: 100%;
  background-repeat:no-repeat;
  .back{
    width:100%;
    position: absolute;
    top: 0rem;
  }
  .topcard{
    width: 92%;
    height: 10rem;
    background: #fff;
    border-radius: 2rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row nowrap;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0px 3px 10px 1px #f1f4f9;
    h2{
      font-size: 1.8rem;
    }
    p{
      font-size: 1.2rem;
    }
    .header{
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .decorate{
        width: 3.8rem;
        margin-bottom: 0.2rem;
      }
      .userheader{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        border: 1px solid #eee;
        img{
          height: 100%;
        }
      }
    }
    .cardinfo{
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      span{
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border-radius: 2rem;
        background: #ffd300;
        line-height: 2rem;
        text-align: center;
      }
      div{
        width: 100%;
        margin-top: 0.5rem;
        p{
          color: #999999;
        }
      }
    }
  }
  .tab{
    width: 100%;
    z-index: 9;
    box-shadow: 0px 5px 18px #f1f4f9;
  }
  .isfixed{
    width: 100%;
    position: fixed;
    top: 0rem;
    z-index: 2;
  }
  .curriculumlist{
    width: 100%;
    margin-top: 0.15rem;
    border-bottom: 1px solid #eee;
    background-color: #eff1f3;
    /* margin-top: -0.15rem; */
    .detailbox{
      width: 100%;
      /* padding: 0.5rem 1.4rem; */
      margin-bottom: 0.5rem;
      background: #fff;
      .listitem{
        width: 88%;
        padding: 0.5rem 1.4rem;
        .name{
          h2{
            font-size: 2rem;
            padding: 0.8rem 0;
          }
          span{
            display: inline-block;
            width: 4rem;
            height: 1.6rem;
            background: orange;
            border-radius: 0.8rem;
            text-align: center;
            line-height: 1.6rem;
            color: #fff;
            margin-left: 0.5rem;
          }
        }
        .detailinfo{
          font-size: 1.4rem;
          img{
            width: 1.4rem;
            margin-right: 0.5rem;
          }
          h1{
            font-size: 2.5rem;
          }
          span{
            font-size: 1.4rem;
          }
          .detailinfoleft{
            width: 70%;
            div{
              padding: 0.5rem 0;
            }
          }
        }
      }
      .signbtn{
        width: 100%;
        height: 4rem;
        div{
          width: 8rem;
          height: 3rem;
          border-radius: 1.5rem;
          background: #4787f1;
          color: #fff;
          text-align: center;
          line-height: 3rem;
          margin-right: 0.5rem;
        }
        .active{
          background: #eee;
          color: #fff;
        }
      }
    }
  }
}
</style>
