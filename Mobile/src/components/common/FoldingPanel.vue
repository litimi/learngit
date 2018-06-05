<template>
  <div class="folding">
    <ul>
      <li @click="openlist">
        {{data.courseTypeName}}
      </li>
      <div v-if="open" class="detailbox colStartNoWarp" v-for="(datas, index) in data.courseList" :key="index">
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
          <div @click.stop="signup" :class="{active: datas.remainCount === '0'&&ischoose === false}">{{ischoose? '退选' : '立即报名'}}</div>
        </div>
      </div>
      <div v-if="open" class="croyline"></div>
    </ul>
  </div>
</template>
<script>
import { PostCourseClick } from '../../assets/API/api'
export default {
  name: 'FoldingPanel',
  data () {
    return {
      open: false
    }
  },
  props: {
    data: Object,
    isindex: Number,
    ischoose: Boolean
  },
  watch: {
    ischoose (newval, oldval) {
      if (newval !== oldval) {
        this.open = false
      }
    }
  },
  mounted () {
  },
  methods: {
    // 更新课程点击量
    updateclick (courseId) {
      let params = {
        kcdm: courseId,
        xh: '30180227131304611',
        xndm: '2017-2018',
        xqdm: '02',
        xxdm: '1755'
      }
      PostCourseClick(params).then(data => {
        // console.log(data)
      })
    },
    openlist () {
      this.open = !this.open
    },
    enterdetail (courseId) {
      // console.log(courseId)
      this.updateclick(courseId)
      this.$router.push({path: '/classdetail', query: {courseId: courseId}})
    },
    signup () {
      this.$emit('signup', this.data)
    }
  }
}
</script>
<style lang="less" scoped>
  .folding{
    width: 100%;
    ul{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      background: #fff;
      position: relative;
      li{
        width: 90%;
        padding: 0.5rem 1rem;
        position: relative;
        line-height: 2.5rem;
        font-size: 1.5rem;
        background: #fff;
        /* border-top: 1px solid #eee; */
        color: #000;
      }
      &::after{
        content: '';
        width: 95%;
        position: absolute;
        right: 0;
        top: 0;
        height: 1px;
        background: #eee;
      }
      .detailbox{
        width: 90%;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        background: #fff;
        .listitem{
          width: 100%;
          .name{
            h2{
              font-size: 2rem;
              padding: 0.8rem 0;
              font-weight: 500;
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
            position: relative;
            img{
              width: 1.4rem;
              margin-right: 0.5rem;
            }
            h1{
              font-size: 3rem;
              height: 3rem;
            }
            span{
              font-size: 1.4rem;
            }
            .detailinfoleft{
              width: 70%;
              color: #666666;
              div{
                padding: 0.5rem 0;
              }
            }
            .remaincount{
              position: absolute;
              right: 1rem;
              top: -1.5rem;
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
      .croyline{
        width: 100%;
        height: 0.5rem;
        background-color: #eff1f3;
      }
      li::after{
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        border-bottom: 2px solid #ccc;
        border-right: 2px solid #ccc;
        right: 1rem;
        top: 0.8rem;
        transform: rotate(45deg)
      }
    }
  }
</style>
