<template>
  <div class="noinfo">
    <img src="../../assets/images/searchnull.png" alt="">
    <p>{{info}}</p>
  </div>
</template>
<script>
export default {
  name: 'InfoNull',
  data () {
    return {
      // info: '换个关键词试试吧~'
    }
  },
  props: {
    name: Number,
    ischoose: Boolean
  },
  computed: {
    info () {
      var info = ''
      if (this.name === 3) {
        info = '暂无课程'
        return info
      } else if (this.name === 2) {
        info = '换个关键词试试吧'
        return info
      } else if (this.name === 1) {
        if (this.ischoose) {
          info = '您还没有报名任何课程哦'
          return info
        } else {
          info = '目前还没有可选课程'
          return info
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .noinfo{
    width: 100%;
    position: relative;
    background: #fff;
    img{
      width: 100%;
    }
    p{
      position: absolute;
      top: 62%;
      color: #ccc;
      width: 100%;
      text-align: center;
    }
  }
</style>
