<template>
  <div class="orderStatus-container">
    <!-- 头部 -->
    <headBar  :order='order'/>
    <!-- 店铺信息 -->
    <store v-if="this.finished==true" :store='order'/>
    <!-- 订单内容 -->
    <orderInfo :order='order'/>
    <!-- 1品牌分配供应商 -->
    <allotSupplier :order='order'/>
    <!-- 2供应商分配维修员 -->
    <allotEngineer :order='order'/>
    <!-- 3维修员签到 -->
    <van-button v-if="order.formstate==3&&this.$store.state.user.role==='supplier'" @click="confirm">我已到店</van-button>
    <!-- 4维修员完成订单 -->
    <finishFix :order='order'/>
    <!-- 5、6用户与管理确认订单 -->
    <userCheck :order='order'/>
  </div>
</template>

<script>
import { supplierSingIn } from '@/api/order-check'
import { getOrder, getBadOrder } from '@/api/user'
import headBar from './components/headBar.vue'
import store from '@/components/infoBar/storeBar.vue'
import orderInfo from './components/orderInfo.vue'
import allotSupplier from './components/1allotSupplier.vue'
import allotEngineer from './components/2allotEngineer.vue'
import finishFix from './components/4finishFix.vue'
import userCheck from './components/userCheck.vue'
export default {
  name: 'OrderStatus',
  components: {
    headBar,
    store,
    orderInfo,
    allotSupplier,
    allotEngineer,
    finishFix,
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
      if (this.$route.query.badOrderList) {
        const { data } = await getBadOrder(this.postdata)
        this.order = data[0]
      } else {
        const { data } = await getOrder(this.postdata)
        this.order = data[0]
      }
      this.finished = true
    },
    // 到店签到
    confirm () {
      this.$dialog
        .confirm({
          title: '确认签到吗?'
        })
        .then(async () => {
          try {
            supplierSingIn(this.postdata)
            this.$toast.success('签到成功')
            this.$router.go(-1)
          } catch (error) {
            this.$toast.fail('请求失败,请稍后再试')
          }
        })
        .catch(() => {
          // on cancel
        })
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
