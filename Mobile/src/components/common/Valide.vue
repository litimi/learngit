<template>
  <div>
    <lost-page v-if="lost"></lost-page>
  </div>
</template>
<script>
import LostPage from './LostPage'
import { GetToken, GetUserInfo, GetBaseInfo } from '../../assets/API/api'
// GetBaseInfo
import { getQueryId } from '../../assets/js/common'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      lost: false
    }
  },
  components: {
    LostPage
  },
  mounted () {
    const userInfo = {
      username: getQueryId('username'),
      password: getQueryId('password')
      // username: '175530180227131304636',
      // password: '{MD5}7f84a617cae9dadec8c2c148af02219a'
    }
    console.log(userInfo)
    let istoken = ''
    let type = null
    let xxdm = null
    let xndm = null
    let xqdm = null
    let usercode = null
    let name = null
    GetToken(userInfo).then(data => {
      alert(data.data)
      console.log(data)
      istoken = data.data
      localStorage.setItem('token', data.data)
      this.$store.dispatch('setToken', data.data)
      if (data.data) {
        GetUserInfo({token: data.data}).then(data => {
          alert(data.xxdm)
          console.log(data)
          type = data.type
          xxdm = data.xxdm
          usercode = data.usercode
          name = data.name
          this.$store.dispatch('setLoginInfo', data)
          GetBaseInfo({xxdm: data.xxdm, token: istoken}).then(data => {
            alert(data.xn)
            console.log(data)
            xndm = data.xn
            xqdm = data.xq
            this.$store.dispatch('setBaseInfo', data)
            if (type === 4) {
              sessionStorage.setItem('xh', usercode)
              sessionStorage.setItem('xndm', xndm)
              sessionStorage.setItem('xqdm', xqdm)
              sessionStorage.setItem('xxdm', xxdm)
              this.$router.push({path: '/coursesList', query: {xxdm: xxdm, xqdm: xqdm, xndm: xndm, xh: usercode, name: name}})
            } else if (type === 3) {
              sessionStorage.setItem('zgh', usercode)
              sessionStorage.setItem('xndm', xndm)
              sessionStorage.setItem('xqdm', xqdm)
              sessionStorage.setItem('xxdm', xxdm)
              this.$router.push({path: '/myCurriculum', query: {xxdm: xxdm, xqdm: xqdm, xndm: xndm, zgh: usercode}})
            }
          })
        })
      } else {
        // this.$router.push({path: '/lost'})
        Toast({
          message: '好像没有找到想要的信息哦~',
          position: 'middle',
          duration: 2000
        })
        this.lost = true
      }
    })
  }
}
</script>
<style>
</style>
