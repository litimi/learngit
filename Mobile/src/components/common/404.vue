<!--404未找到-->
<template>
  <div class="error">
    抱歉您还没有登录哦~
  </div>
</template>

<!--脚本-->
<script>
export default{
  name: 'Unfounded',
  data () {
    return {
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
  }
</style>
