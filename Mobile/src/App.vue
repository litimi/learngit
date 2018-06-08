<template>
  <div id="app">
    <lazy-render style="width:100%;height:100%">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </lazy-render>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
/* 屏幕大小自适应 */
@media screen and (max-width:359px) and (min-width:320px) {
  html,body{
    font-size: 10px !important;
  }
}
@media screen and (max-width:374px) and (min-width:360px) {
  html,body{
    font-size: 11.25px !important;
  }
}
@media screen and (max-width:413px) and (min-width:375px) {
  html,body{
    font-size: 11.7px !important;
  }
}
@media screen and (max-width:639px)  and (min-width:414px){
  html,body{
    font-size: 12.92px !important;
  }
}@media screen and (min-width:640px) {
  html,body{
    font-size: 20px !important;
  }
}
#app {
  width: 100%;
  height: 100%;
}
</style>
