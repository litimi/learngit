<template>
  <div class="hotreprot">
    <img src="../../assets/images/hotback.png" alt="">
    <div class="hotmodelbox">
      <hot-model v-for="(items, index) in hotlist" :key="index" @choosetype="choosetype" :dataSource="items" :data="data" :index="index" :coursetype="coursetype"></hot-model>
    </div>
  </div>
</template>
<script>
import HotModel from './HotModel'
import { GetCoursesType } from '../../assets/API/api'
export default {
  name: 'HeatReport',
  components: {
    HotModel
  },
  data () {
    return {
      popupVisible: false,
      hotlist: [
        {titleName: '人气排行', title: ['排名', '课程名', '点击量']},
        {titleName: '最快选满', title: ['排名', '课程名', '选满用时']},
        {titleName: '报名最多', title: ['排名', '课程名', '报名人数']}
      ],
      slotslist: [],
      coursetype: ''
    }
  },
  props: {
    data: Array
  },
  computed: {
    // 返回课程类别数据
    dataList () {
      let slots = [
        {
          flex: 1,
          values: this.slotslist,
          className: 'slot-course',
          textAlign: 'center'
        }
      ]
      return slots
    }
  },
  methods: {
    // 获取课程类型列表
    getcoursestype () {
      let params = {
        // xxdm: 1755
      }
      GetCoursesType(params).then(data => {
        console.log(data)
        this.slotslist = data.data
      })
    },
    // 选择课程类别
    choosetype (index) {
      this.getcoursestype()
      this.popupVisible = !this.popupVisible
    },
    // 确认
    handleConfirm () {
      console.log(this.$refs.picker.getValues()[0].lbmc)
      this.coursetype = this.$refs.picker.getValues()[0].lbmc
      this.popupVisible = false
    },
    // 取消
    handleCancell () {
      this.popupVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.hotreprot{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  img{
    width: 100%;
    position: fixed;
    top: 45px;
    height: 100%;
    /* z-index: -1; */
  }
  .hotmodelbox{
    width: 100%;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
  }
  .mintproup{
    width: 100%;
  }
  .pick{
    width: 100%;
    /* position: fixed;
    bottom: 0; */
    background-color: #ffffff;
  }
  .tollbar{
    width: 100%;
    .btn{
      border: none;
      background: none;
      color: #0080ff;
      -webkit-box-shadow: none;
      box-shadow: none;
      &::after {
        background-color: #fff;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
      }
    }
  }
}
</style>
