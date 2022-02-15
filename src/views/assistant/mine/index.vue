<template>
  <div class="mine-container">
    <!-- 头部背景 -->
      <van-image  :src="require('@/assets/pic/mine-background.svg')"/>
    <!-- 用户信息组件 -->
    <userBar :userInfo=userInfo />
    <!-- 中间按钮组件 -->
    <buttonList/>
  </div>
</template>

<script>
import userBar from './components/userBar.vue'
import buttonList from './components/buttonList.vue'
import { getUserInfo } from '@/api/login'

export default {
  name: 'MyIndex',
  components: {
    userBar, buttonList
  },
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.loadUserInfo()
  },
  mounted () {},
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.mine-container{
  .van-image{
    position:absolute;
    top:0;
    left: 0;
    right: 0;
  }
  .userBar{
    margin-top: 107px;
  }
  .buttonList{
    margin-top:32px;
  }
}
</style>
