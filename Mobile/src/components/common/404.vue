<!--404未找到-->
<template>
  <div class="error">
    抱歉您还没有登录哦~
    <span @click.stop="back">点我返回主页</span>
  </div>
</template>

<!--脚本-->
<script>
export default{
  name: 'Unfounded',
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.go(-2)
    }
  }
}
</script>

<!--样式-->
<style scoped lang="less">
  .error{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 40rem;
    font-size: 1.8rem;
    span{
      color: #31ca96;
    }
  }
</style>
