<template>
<div class="userCheck">
  <!-- 正常订单店长确认是否合格 -->
  <div class="button" v-if="order.formstate==5&&$store.state.user.role==='assistant'&&!$route.query.badOrderList" @click="confirm(verify='yes')">合格(确认完成)</div>
  <div class="button" v-if="order.formstate==5&&$store.state.user.role==='assistant'&&!$route.query.badOrderList" @click="confirm(verify='no')">不合格(重新维修)</div>
  <!-- 不合格维修单品牌确认是否强制合格 -->
  <div class="button" v-if="order.formstate==5&&$store.state.user.role==='brand'&&$route.query.badOrderList" @click="confirm(verify='yes',)">合格(确认完成)</div>
  <div class="button" v-if="order.formstate==5&&$store.state.user.role==='brand'&&$route.query.badOrderList" @click="confirm(verify='no')">不合格(重新维修)</div>
  <!-- 正常订单品牌确认是否合格 -->
  <div class="button" v-if="order.formstate==6&&$store.state.user.role==='brand'" @click="confirm(verify='yes')">确认完成</div>
  <div class="button" v-if="order.formstate==6&&$store.state.user.role==='brand'" @click="confirm(verify='no')">重新进行</div>
</div>
</template>
<script>
import { Dialog } from 'vant'
import { assistantConfirmOrder, brandConfirmOrder, brandConfirmBadOrder } from '@/api/order-check'
export default {
  name: 'userCheck',
  components: {},
  props: ['order'],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async confirm (verify) {
      if (verify === 'yes') {
        Dialog.confirm({
          title: '确认完成订单吗?'
        })
          .then(async () => {
            const postdata = this.$qs.stringify({
              id: this.$store.state.order.id,
              verify: 'yes'
            })
            try {
              if (this.$store.state.user.role === 'assistant') {
                await assistantConfirmOrder(postdata)
              } else if (this.$store.state.user.role === 'brand' && this.$route.query.badOrderList) {
                await brandConfirmBadOrder(postdata)
              } else if (this.$store.state.user.role === 'brand') {
                await brandConfirmOrder(postdata)
              }
              this.$toast.success('订单状态已更改')
              this.$router.go(-1)
            } catch (error) {
              this.$toast.fail('数据请求失败,请稍后再试')
            }
          })
          .catch(() => {})
      } else if (verify === 'no') {
        Dialog.confirm({
          title: '确认重新维修吗?'
        })
          .then(async () => {
            const postdata = this.$qs.stringify({
              id: this.$store.state.order.id,
              verify: 'no'
            })
            try {
              if (this.$store.state.user.role === 'assistant') {
                await assistantConfirmOrder(postdata)
              } else if (this.$store.state.user.role === 'brand' && this.$route.query.badOrderList) {
                await brandConfirmBadOrder(postdata)
              } else if (this.$store.state.user.role === 'brand') {
                await brandConfirmOrder(postdata)
              }
              this.$toast.success('订单状态已更改')
              this.$router.go(-1)
            } catch (error) {
              this.$toast.fail('数据请求失败,请稍后再试')
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped lang="less">
.userCheck{
  .button{
  display: inline-block;
  margin: 10px 0px 20px 20px;
  width: 157px;
  height: 40px;
  background: #000000;
  border-radius: 6px;
  text-align: center;
  padding-top: 13px;
  color: #FFFFFF;
  font-family: PingFang Bold;
  font-size: 13px;
  }
}
</style>
