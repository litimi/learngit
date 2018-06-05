<!--种类导航栏-->
<template>
  <div class="productNavigation">
    <transition name="slide-fade">
      <div class="searchBox rowCenterNoWarp" v-if="show">
        <div class="search rowStartWarp">
          <div class="colCenterNoWarp">
            <img src="../../assets/images/searchpic.png" alt="">
          </div>
          <input id="q" type="text" v-model="searchKey" placeholder="输入关键字" ref="input">
          <div class="delete" @click="deletekey"><img src="../../assets/images/delete.png" alt=""></div>
        </div>
        <p @click.stop="cancel">取消</p>
      </div>
    </transition>
    <transition name="slide-fade">
      <ul class="productCategory rowAroundNoWarp" v-if="!show">
        <li v-for="(items,index) in dataSource" :key="index" class="productCategoryItem"
        :class="{'categorySelect':items.IsSelect}" @click="isSelect(index)">{{items.CategoryName}}</li>
        <li class="searchbtn rowEndNoWarp" @click="search"><img src="../../assets/images/scall.png" alt=""></li>
      </ul>
    </transition>
  </div>
</template>
<!--脚本-->
<script>
export default{
  name: 'StudentTab',
  data () {
    return {
      searchKey: '',
      show: false
    }
  },
  watch: {
    searchKey () {
      setTimeout(() => {
        var oldSearchKey = this.searchKey
        if (oldSearchKey === this.searchKey && this.searchKey) {
          this.$emit('search', this.searchKey, this.show)
        }
      }, 1000)
    }
  },
  components: {
  },
  methods: {
    deletekey () {
      this.searchKey = ''
      this.$emit('search', this.searchKey)
    },
    isSelect (index) {
      for (var i of this.dataSource) {
        i.IsSelect = false
      }
      this.dataSource[index].IsSelect = true
      this.$emit('choose', index)
    },
    search () {
      this.show = true
    },
    cancel () {
      this.show = false
      this.searchKey = ''
      this.$emit('cancel', this.show)
    }
  },
  computed: {
  },
  props: {
    dataSource: Array
  },
  created () {
  }
}
</script>
<!--样式-->
<style lang="less" scoped>
.productNavigation{
  /* position: relative; */
  /* z-index:9; */
  background-color: white;
  width:100%;
  height: 4rem;
  overflow: hidden;
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .productCategory{
    height: 4rem;
    width:100%;
    background-color: white;
    box-shadow: 0px 3px 10px #f1f4f9;
    box-sizing: border-box;
    .productCategoryItem{
      height: 100%;
      width: 30%;
      font-size: 1.5rem;
      line-height: 4rem;
      text-align: center;
      float: left;
      color: #666;
    }
    li{text-align: center;}
    .searchbtn{
      width: 20%;
      height: 100%;
      img{
        width: 1.5rem;
      }
    }
    .categorySelect{
      position: relative;
      box-sizing: border-box;
      color: #000;
      font-weight: 500;
      font-size: 1.8rem;
    }
    .categorySelect::after{
      content: '';
      width: 3rem;
      height: 2px;
      background-color: #6bc4f8;
      position: absolute;
      bottom: 0;
      left: 30%;
    }
  }
  .searchBox{
    z-index: 9;
    width: 100%;
    height: 50px;
    background-color: white;
    /* box-shadow: 0px 3px 10px 1px #dbdbdb; */
    .search{
      width: 80%;
      height: 2.5rem;
      border-radius: 0.4rem;
      transition: all .5s ease-in-out;
      background-color: #eff1f3;
      position: relative;
      div{
        padding: 0 0.5rem;
        height: 100%;;
        img{
          width: 1.8rem;
          height: 1.8rem;
          /* left: 1rem; */
          /* position: absolute; */
          /* top: 50%; */
          /* transform: translateY(-50%); */
        }
      }
      .delete{
        position: absolute;
        right: 0;
        top: 0.5rem;
        img{
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      input[type="text"]{
        width: 85%;
        height: 100%;
        border: 1px solid #eee;
        border-radius: 0.13rem;
        font-size: 1rem;
        box-sizing: border-box;
        background: #eff1f3;
        text-align: start;
        position: relative;
        border-radius: 0.4rem;
      }
    }
    p{
      font-size: 1.4rem;
      color: #34acf1;
      /* opacity: 0; */
      transition: all .5s ease-in-out;
      width: 3rem;
      text-align: right;
      &.show{
        opacity: 1;
      }
    }
  }
}
</style>
