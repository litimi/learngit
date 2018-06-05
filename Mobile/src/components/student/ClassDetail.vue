<template>
  <div class="coursedetail ">
    <img src="../../assets/images/detailback.png" alt="" class="back">
    <!-- 课程详情头部 -->
    <div class="top colStartNoWarp">
      <div class="colCenterNoWarpStart">
        <p class="tips">校本课-{{coursedetails.kclbmc}}</p>
      </div>
      <div class="colStartNoWarp">
        <h2>{{coursedetails.kcmc}}</h2>
        <p>人数限制<span>{{coursedetails.xzrs}}</span>人，已报名<span>{{coursedetails.bmrs}}</span>人</p>
      </div>
    </div>
    <!-- 课程详情 -->
    <ul class="detail colStartNoWarpStart">
      <img src="../../assets/images/tag.png" alt="" class="targ" v-if="coursedetails.state">
      <div class="colStartNoWarpStart">
        <h2>授课教师</h2>
        <span>{{coursedetails.skrxm}}</span>
      </div>
      <div class="colStartNoWarpStart">
        <h2>上课日期</h2>
        <span>{{coursedetails.skksrq}} 至 {{coursedetails.skjsrq}}</span>
      </div>
      <div class="colStartNoWarpStart">
        <h2>时间地点</h2>
        <span v-for="(item, index) in coursedetails.sksjdd" :key="index">星期{{item.week}}第{{item.section}}节{{item.cdmc}}</span>
      </div>
      <div class="colStartNoWarpStart">
        <h2>课程简介</h2>
        <p></p>
      </div>
      <div class="colStartNoWarpStart">
        <h2>性别限制</h2>
        <span v-if="coursedetails.xbxz === '0'">无</span>
        <span v-else-if="coursedetails.xbxz === '1'">男</span>
        <span v-else-if="coursedetails.xbxz === '2'">女</span>
      </div>
      <div class="colStartNoWarpStart">
        <h2>报名时间</h2>
        <span v-for="(time, timeindex) in coursedetails.bmsjlb" :key="timeindex">{{time.kssj}}至{{time.jssj}}</span>
      </div>
      <div class="signup" @click="signup(coursedetails)" :class="{active: coursedetails.state}">立即报名</div>
    </ul>
    <!-- <div class="signup" @click="signup">立即报名</div> -->
  </div>
</template>
<script>
import { GetCourseDetails, PostSelectCourse } from '../../assets/API/api'
import { Toast } from 'mint-ui'
export default {
  name: 'ClassDetail',
  data () {
    return {
      coursedetails: {},
      xh: JSON.parse(localStorage.getItem('susercode'))
    }
  },
  components: {
  },
  created () {
    this.getcoursedetails()
  },
  methods: {
    signup (tag) {
      if (tag.state) {
        Toast({
          message: '您已经选过该课哦',
          position: 'middle',
          duration: 1000
        })
      } else {
        this.postselectcourse(tag)
      }
    },
    // 选课
    postselectcourse (tag) {
      let XkxtXsxk = {
        kcdm: tag.kcdm,
        xh: this.xh
        // xndm: '2017-2018',
        // xqdm: '02',
        // xxdm: '1755'
      }
      PostSelectCourse(XkxtXsxk).then(data => {
        // console.log(data)
        if (data.status === 200) {
          // this.getlistoptionalcourse()
          Toast({
            message: '选课成功',
            position: 'middle',
            duration: 1000
          })
        } else if (data.status === -10) {
          Toast({
            message: data.message,
            position: 'middle',
            duration: 1000
          })
        }
      })
    },
    getcoursedetails () {
      let params = {
        xh: this.xh,
        // xxdm: '1755',
        kcdm: this.$route.query.courseId
      }
      GetCourseDetails(params).then(data => {
        if (data.status === 200) {
          this.coursedetails = data.data
          console.log(this.coursedetails)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .coursedetail{
    .back{
      width: 100%;
      position: fixed;
      top: 0rem;
      z-index: -2;
      -webkit-filter: blur(1px);
      -moz-filter: blur(1px);
      -ms-filter: blur(1px);
      filter: blur(1px);
    }
    .top{
      width: 100%;
      /* background-color: #4787f1; */
      /* margin-top: 5rem; */
      position: fixed;
      top: 0rem;
      color: #fff;
      height: 17rem;
      z-index: -1;
      div{
        width: 100%;
        height: 5rem;
        .tips{
          width: 40%;
          height: 2rem;
          border-bottom-right-radius: 1rem;
          border-top-right-radius: 1rem;
          background: #4787f1;
          line-height: 2rem;
          text-align: center;
        }
        h2{
          font-size: 1.8rem;
          padding: 0.5rem 0;
        }
        p{
          font-size: 1.2rem;
        }
        span{
          width: 3.5rem;
          height: 1.5rem;
          border-radius: 1rem;
          display: inline-block;
          background: #ffd300;
          text-align: center;
          line-height: 1.5rem;
          margin: 0 0.2rem;
          color: #000;
        }
      }
    }
    .detail{
      width: 100%;
      /* padding: 1.3rem; */
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      position: relative;
      top: 16rem;
      background: #fff;
      padding-bottom: 4rem;
      div{
        width: 80%;
        padding: 1rem 1rem 1rem 3rem;
      }
      .targ{
        position: absolute;
        width: 10rem;
        height: 8rem;
        right: 0rem;
        top: 3rem;
      }
      h2{
        position: relative;
        font-size: 1.8rem;
        font-weight: 500;
        &::before{
          content: '';
          width: 6px;
          height: 6px;
          background: #4787f1;
          position: absolute;
          border-radius: 50%;
          top: 0.8rem;
          left: -1rem;
        }
      }
      span{
        display: block;
        padding: 0.5rem 0;
      }
      .signup{
        position: fixed;
        bottom: 2rem;
        width: 50%;
        height: 3rem;
        background-color: #4787f1;
        line-height: 3rem;
        color: #fff;
        border-radius: 1.5rem;
        text-align: center;
        left: 25%;
        padding: 0;
      }
      .active{
        background-color: #ccc;
      }
    }
  }
</style>
