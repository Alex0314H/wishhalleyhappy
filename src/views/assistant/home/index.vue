<template>
<div class="home-container">
      <!-- 上层背景 -->
      <van-image style="position:absolute" :src="require('@/assets/pic/home-background.png')"
        />
      <!-- logo -->
      <van-image class="logo"  :src="require('@/assets/pic/logo-white.png')"
        />
      <!-- 搜索框 -->
      <van-search  placeholder="请输入订单号/订单类型" @click="$router.push({ path: 'orderList', query: { searchStatus: false } })" shape="round" background="transparent"  />
      <!-- 中间的图片 -->
      <van-image class="middleImage" :src="require('@/assets/pic/home-image.png')" />
      <!-- 中层正在描述的订单问题 -->
      <notification v-if="finished"  :orders="orders"/>

      <van-overlay  :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <notificationFull ref="notification" :orders="orders"/>
        </div>
      </van-overlay>
      <!-- 下层报修与查询按钮 -->
      <div class="function-button">
        <functionButton
        icon="repair"
        :title="function_name[user_role.indexOf(this.$store.state.user.role)]"
        text="线上报修立马处理"
        @click.native="repair"
        />
        <functionButton
        icon="inquire"
        title="查询"
        text="报修进度尽在了解"
        @click.native="$router.push('orderList')"
        />
      </div>
</div>
</template>

<script>
import notificationFull from './components/notification-full.vue'
import notification from './components/notification.vue'
import functionButton from './components/function-button.vue'
import { getNotification } from '@/api/user'
export default {
  name: 'home',
  components: {
    notification,
    functionButton,
    notificationFull
  },
  props: {},
  data () {
    return {
      value: '',
      show: false,
      orders: [],
      finished: false,
      function_name: ['报修', '报修', '维修', '维修'],
      user_role: ['assistant', 'brand', 'supplier', 'areaManager']
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getOrders()
  },
  mounted () {
  },
  methods: {
    repair () {
      if (this.$store.state.user.role === 'assistant' || this.$store.state.user.role === 'brand') {
        this.$router.push({ path: 'storeList', query: { createOrder: true } })
      } else { this.$router.push('storeList') }
    },
    showOrders (id) {
      this.show = true
      this.$refs.notification.getOrders(id)
    },
    async getOrders () {
      const { data } = await getNotification()
      this.orders = data
      this.finished = true
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 812px;
  .logo{
    margin:65px 225px 5px 17px;
  }
  .middleImage{
    width: 335px;
    height: 335px;
    margin: 10px 0 0 20px;
  }
  .van-search__content {
    z-index:1;
    margin-top: 8px;
    background-color:rgba(122, 122, 122 ,0.42);
    ::before{
      color: #FFFFFF;
      opacity:0.6;
    }
    ::placeholder{
      color:#FFFFFF;
    opacity:0.6;
    }
  }
  .wrapper {
    margin: auto;
    margin-top: 50%;
    width: 335px;
  }
}
</style>
