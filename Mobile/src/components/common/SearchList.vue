<template>
  <div class="folding">
    <ul>
      <li @click="openlist">
        {{data.courseTypeName}}
      </li>
      <div v-if="open" class="detailbox colStartNoWarp" v-for="(datas, index) in data.courseList" :key="index">
        <div @click="enterdetail(datas.courseId)" class="listitem">
          <div class="rowStartNoWarp name"><h2>{{datas.courseName}}</h2><span v-if="data.remainCount === '0'">已约满</span></div>
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
              <span v-if="data.remainCount">剩余名额</span>
              <span v-else>暂无报名</span>
            </div>
          </div>
        </div>
        <div class="signbtn rowEndNoWarp">
          <div @click.stop="signup" :class="{active: data.remainCount === '0'&&ischoose === false}">{{ischoose? '退选' : '立即报名'}}</div>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style>
</style>