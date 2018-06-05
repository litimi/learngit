<!--种类导航栏-->
<template>
  <div class="productNavigation">
    <ul class="productCategory">
      <li v-for="(items,index) in dataSource" :key="index" class="productCategoryItem"
      :class="{'categorySelect':items.IsSelect}" @click="isSelect(index)">{{ items.CategoryName }}</li>
    </ul>
  </div>
</template>
<!--脚本-->
<script>
export default{
  name: 'TeacherTabNav',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    isSelect (index) {
      for (var i of this.dataSource) {
        i.IsSelect = false
      }
      this.dataSource[index].IsSelect = true
      this.$emit('choose', index)
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
  position: relative;
  z-index:9;
  background-color: white;
  width:100%;
  box-shadow: 0px 3px 10px #f1f4f9;
  .productCategory{
    height: 4rem;
    width:100%;
    background-color: white;
    /* border-bottom: 1px solid #ddd; */
    box-sizing: border-box;
    .productCategoryItem{
      height: 100%;
      width: 50%;
      font-size: 1.5rem;
      line-height: 4rem;
      text-align: center;
      float: left;
      color: #888;
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
      left: 38%;
    }
  }
}
</style>
