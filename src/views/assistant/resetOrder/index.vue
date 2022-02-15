<template>
  <div class="resetOrder-container">
    <!-- 头部 -->
    <headBar/>
    <!-- 订单信息 -->
    <createOrderBar
      ref="order"
      :id="id"
      reset
    />
    <!-- 确认按钮 -->
    <van-button
    block
    type="primary"
    @click="onSubmit"
    color="#000000">
    提交订单
    </van-button>

  </div>
</template>

<script>
import { resetOrder } from '@/api/order-CRUD'
import headBar from '../createOrder/components/headBar.vue'
import createOrderBar from '../createOrder/components/createOrderBar.vue'
export default {
  name: 'resetOrder',
  components: {
    headBar,
    createOrderBar
  },
  props: {},
  data () {
    return {
      id: this.$store.state.order.id
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onSubmit () {
      this.$refs.order.confirm()
      if (!this.$refs.order.backmsg) {
        this.$toast.fail('请确认订单信息填写完整')
        return false
      }
      const { data } = await resetOrder(this.$refs.order.a)
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
.resetOrder-container{
  .van-button{
    margin-left: 20px;
    width: 335px;
    margin-top: 28px;
  }
}
</style>
