<template>
<div class="orderStatusHeader">
    <div class="title">
    <van-icon @click="backButton" name="arrow-left" color=#FFFFFFFF size=24px />
    <div class="text">{{ status[order.formstate-1] }}
    </div>
    <van-image  :src="require('@/assets/pic/deleteOrder.svg')" class="delete" v-if="order.formstate==1&&(this.$store.state.user.role==='assistant'||'brand')" @click="deleteOrder"/>
    <van-image  :src="require('@/assets/pic/editOrder.svg')"   class="edit" v-if="order.formstate==1&&(this.$store.state.user.role==='assistant'||'brand')" @click="editOrder"/>
    </div>
    <div class="statusBar" v-if="order.formstate<7" >
        <statusInfo :order='order' type="supplier"/>
        <statusInfo :order='order' type="maintainer"/>
    </div>
    <div class="overBar"  v-if="order.formstate==7">
    <van-image style="position:absolute;left:123px " :src="require('@/assets/pic/order-status-finished.svg')" />
        <div class="text">订单已完成</div>
    </div>
</div>
</template>

<script>
import { deleteOrder } from '@/api/order-CRUD'
import StatusInfo from './allotStatus.vue'
export default {
  name: 'orderStatusHeader',
  components: { StatusInfo },
  props: ['order'],
  data () {
    return {
      status: [
        '供应商待分配',
        '工人待分配',
        '工人到店中',
        '工人维修中',
        '订单待确认',
        '店长已确认',
        '订单已完成']
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    backButton () {
      this.$router.go(-1)
    },
    deleteOrder () {
      this.$dialog.confirm({
        title: '确认删除订单吗?'
        // message: '确认删除订单吗?'
      })
        .then(async () => {
          const postdata = this.$qs.stringify({
            id: this.$store.state.order.id
          })
          const { data } = await deleteOrder(postdata)
          this.$toast.success(data)
          this.$router.go(-1)
        })
        .catch(() => {
        // on cancel
        })
    },
    // 修改订单
    editOrder () {
      this.$store.commit('setOrder', this.order)
      this.$router.push('resetOrder')
    }
  }
}
</script>

<style scoped lang="less">
  // 头部
.orderStatusHeader{
    height: 185px;
    background-color: rgba(0, 0, 0, 1);
    padding-top: 44px;
    .title{
      width: 375px;
      height: 44px;
      .van-icon{
        padding-top: 6px;
        position: absolute;
        padding-left: 20px;
      }
      .delete{
        position: absolute;
        left: 297px;
        top: 53px;
      }
      .edit{
        position: absolute;
        left: 331px;
        top: 53px;
      }
      .text{
        text-align: center;
        padding-top: 10px;
        color:rgba(255, 255, 255, 1);
        font-size: 18px;
        font-family: PingFang Bold;
      }
    }
    .statusBar{
      display:inline-flex;
      background-color: rgba(255, 255, 255, 1);
      margin-left: 20px;
      border-radius: 4px;
    }
    .overBar{
      position: relative;
      padding-top: 30px;
      padding-left: 18px;
      height: 78px;
      width: 335px;
      background-color: rgba(255, 255, 255, 1);
      margin: auto;
      text-align: center;
      border-radius: 4px;
      font-family: PingFang Bold;
      line-height: 18px;
      font-size: 13px;
      color: rgba(102, 102, 102, 1);
    }
  }
</style>
