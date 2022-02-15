<template>
  <div class="userCenter-container">
    <!-- 头部 -->
    <headBar ref="headBar" back="home" />
    <van-cell title="修改密码" is-link to="changePassword"/>
    <van-cell title="修改个人信息" is-link />
    <van-button @click="onLogout" color="#E2E2E2">退出登录</van-button>
  </div>
</template>

<script>
import { logOut } from '@/api/user'
import headBar from './components/headBar.vue'
export default {
  name: 'userCenter',
  components: {
    headBar
  },
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(async () => {
        // on confirm
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        const { data } = await logOut()
        console.log(data)
        this.$store.commit('setUser', null)
        this.$toast.success('退出登录')
        this.$router.push('login')
      }).catch(() => {
        // on cancel
        console.log('取消执行这里')
      })
    }
  }
}
</script>

<style scoped lang="less">
.userCenter-container{
  height: 812px;
  span{
    font-size: 15px;
    font-weight: bold;
  }
  .van-button{
    top: 400px;
    margin-left: 20px;
    width:90%;
    .van-button__text{
    font-size: 13px;
    font-family: PingFang Bold;
    color: #FFFFFF;
    letter-spacing: 1px;
    }
  }
}
</style>
