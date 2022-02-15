<template>
  <div class="createOrder-container">
    <!-- 头部 -->
    <headBar/>
    <!-- 填写订单 -->
    <order ref="order" :id="id" />
    <!-- 确认按钮 -->
    <van-button block type="primary" @click="onSubmit" color="#000000">提交订单</van-button>
  </div>
</template>

<script>
import { createOrder } from '@/api/order-CRUD'
import headBar from './components/headBar.vue'
import order from './components/createOrderBar.vue'
export default {
  name: 'createOrder',
  components: {
    headBar,
    order
  },
  props: {},
  data () {
    return {
      id: this.$store.state.store.id
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      this.$refs.order.confirm()
      if (!this.$refs.order.backmsg) {
        this.$toast.fail('请确认订单信息填写完整')
        return false
      }
      const { data } = await createOrder(this.$refs.order.a)
      if (data.code === 200) {
        this.$toast.success(data.message)
        this.$router.push('orderList')
      } else {
        this.$toast.fail('网络异常，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.createOrder-container {
  .van-button {
    margin-left: 20px;
    width: 335px;
    margin-top: 28px;
  }
}
</style>
