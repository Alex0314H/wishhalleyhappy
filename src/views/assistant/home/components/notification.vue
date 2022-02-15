<template>
  <div class="notification">
    <div v-if="orders.length == 0" class="order">
      <van-image
        class="order-img"
        :src="require('@/assets/pic/home-order.png')"
      />
      <div class="orderName" v-if="orders.length == 0">暂无待办事项</div>
      <van-image
        class="arrow-right"
        :src="require('@/assets/pic/arrow-right.svg')"
      />
    </div>
    <van-swipe
      v-if="orders.length > 0"
      style="height: 1.22667rem"
      vertical
      :show-indicators="false"
      autoplay="3000"
    >
      <van-swipe-item
        v-for="(order, index) in reverseOrders"
        :key="order.id"
        @click="showOrder(index)"
        >
        <div class="order">
          <van-image class="order-img" :src="require('@/assets/pic/home-order.png')"/>
          <div class="orderName">{{ order.formname }}</div>
          <div class="status">{{ status[order.formstate - 1] }}</div>
          <van-image class="arrow-right" :src="require('@/assets/pic/arrow-right.svg')"/>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: 'notification',
  components: {},
  props: ['orders'],
  data () {
    return {
      reverseOrders: this.orders.reverse(),
      status: [
        '供应商待分配',
        '工人待分配',
        '工人到店中',
        '工人维修中',
        '订单待确认',
        '订单已确认',
        '订单已完成'
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showOrder (id) {
      this.$parent.showOrders(id)
    }
  }
}
</script>

<style scoped lang="less">
.notification {
  margin-top: 20px;
  margin-left: 20px;
  width: 335px;
  .order {
    font-weight: 600;
    display: flex;
    width: 335px;
    height: 46px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 1);
    font-size: 15px;
    .free {
      margin-top: 15px;
      margin-left: 20px;
    }
    .van-image {
      width: 24px;
      height: 24px;
    }
    .order-img {
      margin: 11px 12px 0 12px;
    }
    .orderName {
      display: flex;
      margin: auto;
      line-height: 18px;
      flex: 1;
    }
    .status {
      padding-top: 15px;
      float: right;
      color: red;
    }
    .arrow-right {
      margin: 11px 12px 0 0;
    }
  }
}
</style>
