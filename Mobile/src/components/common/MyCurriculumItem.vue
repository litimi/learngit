<template>
  <div class="curriculumitem">
    <h2 class="name">{{dataSource.courseName}}</h2>
    <div class="info">
      <ul>
        <li class="rowStartNoWarp"><img src="../../assets/images/teacher.png" alt="">{{dataSource.courseTypeName}}</li>
        <li class="rowStartNoWarp"><img src="../../assets/images/time.png" alt="">{{dataSource.classTime}}</li>
      </ul>
      <div>
        <h2>{{dataSource.students.length}}</h2>
        <span>已报人数</span>
      </div>
    </div>
    <div class="btnbox rowEndNoWarp">
      <div @click="checkstudent(dataSource.students.length)" :class="{active: dataSource.students.length, open: show}">{{show? '收起学生名单' : '查看学生名单'}}</div>
    </div>
    <ul v-if="show" class="student rowStartWarp">
      <li v-for="(item, index) in dataSource.students" :key="index">
        <img src="../../assets/images/userhead.png" alt="">
        <h4>{{item.xm}}</h4>
        <span>{{item.bj}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'MyCurriculumItem',
  data () {
    return {
      show: false,
      number: 1
    }
  },
  props: {
    dataSource: Object
  },
  mounted () {
    // console.log(typeof this.dataSource)
  },
  methods: {
    checkstudent (num) {
      if (num !== 0) {
        this.show = !this.show
      } else {
        Toast({
          message: '暂无学生报名',
          position: 'middle',
          duration: 1000
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @Btn-size:2rem;
  @color:#0080ff;
  .curriculumitem{
    width: 95%;
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    background: #fff;
    margin-bottom: 1rem;
    .name{
      width: 100%;
      text-align: left;
      color: #000;
      font-size: 2rem;
    }
    .info{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 1.4rem;
      position: relative;
      ul{
        width: 75%;
        li{
          padding: 0.5rem 0;
          font-size: 1.4rem;
          width: 100%;
          word-wrap: normal;
          img{
            margin-right: 1rem;
            width: 1.4rem;
            height: 1.4rem;
          }
        }
      }
      div{
        position: absolute;
        right: 0rem;
        top: -1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 25%;
        span{
          font-size: 1.4rem;
          color: #999999;
        }
        h2{
          font-size: 3.4rem;
        }
      }
      img{
        width: 1.4rem;
      }
    }
    .btnbox{
      width: 100%;
      padding: 0.5rem 0;
      div{
        font-size: 1.4rem;
        color: #b9b9b9;
        text-align: end;
        position: relative;
        display: block;
        /* width: 30%; */
        right: 2rem;
        transition: all .3s ease-in-out;
        &::after{
          content: '';
          position: absolute;
          width: 0.6rem;
          height: 0.6rem;
          border-top: @Btn-size*.1 solid #ccc;
          border-right: @Btn-size*.1 solid #ccc;
          right: -1.2rem;
          top: 0.5rem;
          transform: rotate(135deg) translateX(-@Btn-size*.12) translateY(@Btn-size*.12);
          transition: all .3s ease-in-out;
        }
        &.active{
          color: #4787f1;
          &::after{
            content: '';
            position: absolute;
            width: 0.6rem;
            height: 0.6rem;
            border-top: @Btn-size*.1 solid @color;
            border-right: @Btn-size*.1 solid @color;
            right: -1.2rem;
            top: 0.5rem;
            transform: rotate(135deg) translateX(-@Btn-size*.12) translateY(@Btn-size*.12);
            transition: all .3s ease-in-out;
          }
          &.open{
            &::after{
              transform: rotate(-45deg)
            }
          }
        }
      }
    }
    .student{
      font-size: 1.4rem;
      width: 100%;
      li{
        padding: 0.5rem;
        img{
          width: 4rem;
        }
        h4{
          color: #000;
        }
        span{
          color: #999999;
        }
      }
    }
  }
</style>
