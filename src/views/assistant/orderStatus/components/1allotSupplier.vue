<template>
<div v-if="order.formstate==1&&this.$store.state.user.role==='brand'"  class="allotSupplier">
  <div class="title">订单分配情况</div>
  <div class="supplier">
    <van-image round width="40" height="40" :src="order.supplierimg" />
    <div class="inform">
      <div class="name">{{order.suname}}</div>
      <div class="phone">{{order.suname1}}:{{order.suphone1}}</div>
    </div>
    <div class="arrowRight">
      <van-image width="24" height="24" :src="require('@/assets/pic/arrow-right.svg')" />
    </div>
  </div>
  <div class="button" v-if="order.formstate==1" @click="confirm(verify='yes')">确认分配</div>
</div>
</template>
<script>
import { brandAllotSupplier } from '@/api/order-check'
export default {
  name: 'allotSupplier',
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
    async confirm () {
      this.$dialog.confirm({
        title: '确认分配订单'
        // message: '确认完成订单吗?'
      })
        .then(async () => {
          const postdata = this.$qs.stringify({
            id: this.order.id
          })
          const data = await brandAllotSupplier(postdata)
          this.$toast.success(data)
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.allotSupplier{
    padding-left: 20px;
    padding-top: 12px;
    width: 375px;
    height: 209px;
    background: #FFFFFF;
    .title{
      font-family: PingFang Bold;
      color: #000000;
      font-size: 13px;
      line-height: 18px;
    }
    .supplier{
      margin-top: 28px;
      width: 335px;
      height: 67px;
      border-radius: 8px;
      border: 1px solid #E9E9E9;
      display: flex;
      padding: 12px;
      font-family: PingFang Bold;
      .inform{
        margin-left: 8px;
        flex: 1;
        .name{
          font-size: 15px;
          color: #333333;
          line-height: 21px;
        }
        .phone{
          font-size: 13px;
          color: #999999;
          line-height: 18px;
          margin-top: 4px;
        }
      }
    }
    .button{
    display: inline-block;
    margin-top: 10px;
    margin-right: 20px;
    width: 335px;
    height: 40px;
    background: #000000;
    opacity: 1;
    border-radius: 6px;
    text-align: center;
    padding-top: 13px;
    font-size: 13px;
    font-family: PingFang Bold;
    color: #FFFFFF;
  }
  }
</style>
