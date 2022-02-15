<template>
<div class="userCheck">
  <!-- 区域经理确认 -->
  <div class="button" v-if="order.supplementstate==1&&$store.state.user.role==='areaManager'" @click="confirm(verify='yes')">通过申请</div>
  <div class="button" v-if="order.supplementstate==1&&$store.state.user.role==='areaManager'" @click="confirm(verify='no')">拒绝申请</div>
  <!-- 品牌确认 -->
  <div class="button" v-if="order.supplementstate==2&&$store.state.user.role==='brand'" @click="confirm(verify='yes')">通过申请</div>
  <div class="button" v-if="order.supplementstate==2&&$store.state.user.role==='brand'" @click="confirm(verify='no')">拒绝申请</div>
</div>
</template>
<script>
import { Dialog } from 'vant'
import { areaManagerConFirmSupplement, brandConFirmSupplement } from '@/api/order-check'
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
          title: '确认通过申请吗?'
        })
          .then(async () => {
            const postdata = this.$qs.stringify({
              id: this.$store.state.order.id,
              verify: 'yes'
            })
            try {
              if (this.$store.state.user.role === 'areaManager') {
                await areaManagerConFirmSupplement(postdata)
              } else if (this.$store.state.user.role === 'brand') {
                await brandConFirmSupplement(postdata)
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
          title: '确认拒绝申请吗?'
        })
          .then(async () => {
            const postdata = this.$qs.stringify({
              id: this.$store.state.order.id,
              verify: 'no'
            })
            try {
              if (this.$store.state.user.role === 'areaManager') {
                await areaManagerConFirmSupplement(postdata)
              } else if (this.$store.state.user.role === 'brand') {
                await brandConFirmSupplement(postdata)
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
