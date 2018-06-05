<template>
  <div class="hotreprot">
    <img src="../../assets/images/hotback.png" alt="">
    <div class="hotmodelbox">
      <hot-model v-for="(item, index) in tt" :key="index"></hot-model>
    </div>
    <mt-picker ref="picker" :slots="slots" @change="onValuesChange" class="pick"></mt-picker>
  </div>
</template>
<script>
import HotModel from '../common/HotModel'
export default {
  name: 'HeatReport',
  components: {
    HotModel
  },
  data () {
    return {
      tt: ['1', '1'],
      slots: [
        {
          values: ['年假', '事假', '病假', '婚假', '其他', '婚假']
        }
      ]
    }
  },
  methods: {
    onValuesChange () {
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
  img{
    width: 100%;
    position: fixed;
    top: 5rem;
    height: 100%;
    z-index: -1;
  }
  .hotmodelbox{
    width: 100%;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .pick{
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
  }
}
</style>
