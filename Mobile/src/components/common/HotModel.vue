<template>
  <div class="hotpart">
    <ul>
      <div class="title">
        <span><img src="../../assets/images/leftcuber.png" alt=""></span>
          <h2>{{dataSource.titleName}}</h2>
        <span><img src="../../assets/images/rightcuber.png" alt=""></span>
      </div>
      <li class="btnbox">
        <div @click.stop="choosetype(index)">课程类别</div>
        <div @click.stop="trysort(index)" class="corsetypeleft">{{issort? '倒序排名' : '正序排名'}}</div>
      </li>
      <div class="listtitle">
        <li v-for="(itemb, itembindex) in dataSource.title" :key="itembindex">{{itemb}}</li>
      </div>
      <ul class="list" v-if="index === 0">
        <div  v-for="(item0, itemindex) in showList1" :key="itemindex" class="rowAroundNoWarp">
          <li v-if="itemindex === 0"><img src="../../assets/images/numoen.png" alt=""></li>
          <li v-else-if="itemindex === 1"><img src="../../assets/images/numtwo.png" alt=""></li>
          <li v-else-if="itemindex === 2"><img src="../../assets/images/num3.png" alt=""></li>
          <li v-else><span>{{itemindex + 1}}</span></li>
          <li>{{item0.courseName}}</li>
          <li v-if="index === 0">{{item0.pv}}</li>
        </div>
      </ul>
      <ul class="list" v-if="index === 1">
          <div  v-for="(item1, itemindex) in showList2" :key="itemindex" class="rowAroundNoWarp">
            <li v-if="itemindex === 0"><img src="../../assets/images/numoen.png" alt=""></li>
            <li v-else-if="itemindex === 1"><img src="../../assets/images/numtwo.png" alt=""></li>
            <li v-else-if="itemindex === 2"><img src="../../assets/images/num3.png" alt=""></li>
            <li v-else><span>{{itemindex + 1}}</span></li>
            <li>{{item1.courseName}}</li>
            <li v-if="index === 1">{{item1.xmsj}}</li>
          </div>
        </ul>
        <ul class="list" v-if="index === 2">
          <div  v-for="(item2, itemindex) in showList3" :key="itemindex" class="rowAroundNoWarp">
            <li v-if="itemindex === 0"><img src="../../assets/images/numoen.png" alt=""></li>
            <li v-else-if="itemindex === 1"><img src="../../assets/images/numtwo.png" alt=""></li>
            <li v-else-if="itemindex === 2"><img src="../../assets/images/num3.png" alt=""></li>
            <li v-else><span>{{itemindex + 1}}</span></li>
            <li>{{item2.courseName}}</li>
            <li v-if="index === 2">{{item2.bmrs}}</li>
          </div>
        </ul>
      <div @click="opened" class="openbtn" :class="{active: open}">{{open?'点击收起':'点击展开'}}</div>
    </ul>
    <!-- <li v-if="index === 1">{{item.xmsj}}</li><li v-if="index === 2">{{item.bmrs}}</li> -->
    <mt-popup
      class="mintproup"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker ref="picker" :slots="dataList" class="pick" show-toolbar value-key="lbmc">
        <div class="tollbar rowBetweenNoWarp">
          <mt-button @click="handleCancell" class="btn">取消</mt-button>
          <mt-button @click="handleConfirm(index)" class="btn">确认</mt-button>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { GetCoursesType } from '../../assets/API/api'
export default {
  name: 'HotModel',
  data () {
    return {
      open: false,
      issort: false,
      list1: [],
      list2: [],
      list3: [],
      popupVisible: false,
      slotslist: [],
      coursetype: '',
      islist1: false
    }
  },
  props: {
    dataSource: Object,
    data: Array,
    index: Number
  },
  computed: {
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
    },
    showList1 () {
      if (!this.open) {
        var showlist1 = []
        if (this.list1.length > 3) {
          for (var j = 0; j < 3; j++) {
            showlist1.push(this.list1[j])
          }
        } else {
          // console.log(1)
          showlist1 = this.list1
        }
        return showlist1
      } else {
        return this.list1
      }
    },
    showList2 () {
      if (!this.open) {
        var showlist2 = []
        if (this.list2.length > 3) {
          for (var i = 0; i < 3; i++) {
            showlist2.push(this.list2[i])
          }
        } else {
          showlist2 = this.list2
        }
        return showlist2
      } else {
        return this.list2
      }
    },
    showList3 () {
      if (!this.open) {
        var showlist3 = []
        if (this.list3.length > 3) {
          for (var i = 0; i < 3; i++) {
            showlist3.push(this.list3[i])
          }
        } else {
          showlist3 = this.list3
        }
        return showlist3
      } else {
        return this.list3
      }
    }
  },
  created () {
    setTimeout(() => {
      for (const i in this.data) {
        this.list3[i] = this.list2[i] = this.list1[i] = this.data[i]
      }
    }, 0)
    this.getcoursestype()
  },
  methods: {
    // 确认
    handleConfirm (index) {
      this.coursetype = this.$refs.picker.getValues()[0].lbmc
      var arr = []
      this.data.forEach(item => {
        if (item.courseTypeName === this.coursetype) {
          arr.push(item)
        }
      })
      if (index === 0) {
        this.list1 = arr
      } else if (index === 1) {
        this.list2 = arr
      } else if (index === 2) {
        this.list3 = arr
      }
      this.popupVisible = false
    },
    // 取消
    handleCancell () {
      this.popupVisible = false
    },
    // 获取课程类型列表
    getcoursestype () {
      let params = {
        xxdm: 1755
      }
      GetCoursesType(params).then(data => {
        this.slotslist = data.data
      })
    },
    opened () {
      this.open = !this.open
    },
    choosetype (index) {
      this.getcoursestype()
      this.popupVisible = !this.popupVisible
    },
    // 比较器
    compare (propertyName) {
      return function (object1, object2) {
        var value1 = object1[propertyName]
        var value2 = object2[propertyName]
        if (value2 < value1) {
          return 1
        } else if (value2 > value1) {
          return 1
        } else {
          return 0
        }
      }
    },
    // 排序按钮
    trysort (index) {
      this.issort = !this.issort
      if (index === 0) {
        this.list1.sort(this.compare('pv'))
      } else if (index === 1) {
        this.list2.sort(this.compare('timeMillis'))
      } else if (index === 2) {
        this.list3.sort(this.compare('bmrs'))
      }
    }
  }
}
</script>
<style lang="less" scoped>
@Btn-size:2rem;
@color:#0080ff;
.hotpart{
  width: 90%;
  background-color: #fff;
  margin-bottom: 0.5rem;
  border-radius: 0.8rem;
  box-shadow: 0px 3px 10px 1px #dbdbdb;
  ul{
    width: 90%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.2rem;
    .title{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      span{
        height: 1.3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        img{
          /* height: 100%; */
          width: 60%;
        }
      }
      h2{
        font-size: 1.8rem;
        margin: 0 0.8rem;
      }
    }
    .btnbox{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 1rem 0;
      width: 100%;
      div{
        width: 8rem;
        text-align: center;
        position: relative;
        color: #666666;
        font-size: 1.4rem;
        &::after{
          content: '';
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          border-top: @Btn-size*.1 solid #666666;
          border-right: @Btn-size*.1 solid #666666;
          right: 0.5rem;
          top: 0.6rem;
          transform: rotate(135deg) translateX(-@Btn-size*.12) translateY(@Btn-size*.12);
          transition: all .3s ease-in-out;
        }
      }
      .corsetypeleft::before{
        content: '';
        position: absolute;
        width: 2px;
        height: 1rem;
        left: -0.8rem;
        top: 0.2rem;
        background: #d0d0d0;
      }
    }
    .listtitle{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      li{
        width: 40%;
        font-size: 1.5rem;
        color: #d0d0d0
        /* text-align: center; */
      }
      li:last-child{
        text-align: right;
        width: 6rem;
      }
      li:first-child{
        width: 4rem;
      }
    }
    .list{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      div{
        width: 100%;
        padding: 0.5rem 0;
      }
      li{
        width: 40%;
        height: 2rem;
        font-size: 1.5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 2rem;
        &:last-child{
          text-align: right;
          width: 6rem;
        }
        &:first-child{
          width: 4rem;
        }
        img{
          width: 1.5rem;
          margin-top: 0.25rem;
        }
        span{
          width: 2rem;
          height: 2rem;
          display: inline-block;
          text-align: center;
          line-height: 2rem;
        }
      }
    }
    .openbtn{
      color: #0080ff;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        border-top: @Btn-size*.1 solid #0080ff;
        border-right: @Btn-size*.1 solid #0080ff;
        right: -1rem;
        top: 0.5rem;
        transform: rotate(135deg) translateX(-@Btn-size*.12) translateY(@Btn-size*.12);
        transition: all .3s ease-in-out;
      }
      &.active{
        &::after{
          transform: rotate(-45deg)
        }
      }
    }
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
