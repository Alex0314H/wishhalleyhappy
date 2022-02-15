<template>
  <div class="orderStatus-container">
    <!-- 头部 -->
    <headBar  :order='order'/>
    <!-- 店铺信息 -->
    <!-- 订单内容 -->
    <orderInfo :order='order'/>
    <!-- 确认订单 -->
    <userCheck :order='order'/>
  </div>
</template>

<script>
import { getSupplement } from '@/api/user'
import headBar from './components/headBar.vue'
import orderInfo from './components/orderInfo.vue'
import userCheck from './components/userCheck.vue'
export default {
  name: 'OrderStatus',
  components: {
    headBar,
    orderInfo,
    userCheck
  },
  props: {},
  data () {
    return {
      order: {},
      store: {},
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getStatus()
  },
  mounted () {},
  methods: {
    // 获取订单信息
    async getStatus () {
      this.postdata = this.$qs.stringify({
        id: this.$store.state.order.id
      })
      const { data } = await getSupplement(this.postdata)
      this.order = data[0]
      this.finished = true
    }
  }
}
</script>

<style scoped lang="less">
.van-button {
  margin: 16px 0 20px 20px;
  border: none;
  width: 335px;
  height: 40px;
  background: #000000;
  border-radius: 6px;
  font-size: 13px;
  font-family: PingFang Bold;
  color: #ffffff;
}
</style>
