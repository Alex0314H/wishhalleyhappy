<template>
  <div class="orderList-container">
    <!-- 头部 -->
    <headBar ref="headBar" back="home" :searchStatus="searchStatus"/>
    <!-- 订单列表 -->
    <listBar
      v-if="!$route.query.searchStatus"
      v-show="!searchStatus"
      :listTypes="listTypes"
      type="order"
    />
    <!-- 搜索订单 -->
    <div class="searchOrderList" v-show="searchStatus">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <order
          v-for="(order, index) in orders"
          :key="index"
          click
          :order="order"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { getOnGoingOrder, getPastOrder } from '@/api/user'
import { searchOrder } from '@/api/order-CRUD'
import headBar from './components/headBar.vue'
import listBar from '@/components/listBar.vue'
import order from '@/components/infoBar/orderBar.vue'
import { Toast } from 'vant'
export default {
  name: 'orderList',
  components: {
    listBar,
    headBar,
    order
  },
  props: {},
  data () {
    return {
      orders: [],
      value: '',
      searchStatus: false,
      loading: false, // 加载状态
      finished: true, // 加载完成状态
      error: false, // 加载错误状态
      listTypes: [
        {
          type: '进行中的报修',
          async getItems () {
            const { data } = await getOnGoingOrder()
            return data
          }
        },
        {
          type: '已完成的报修',
          async getItems () {
            const { data } = await getPastOrder()
            return data
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 获取搜索数据
    async searchOrders (val) {
      this.finished = false
      this.loading = true
      this.orders = []
      const postdata = this.$qs.stringify({ search: val })
      try {
        const { data } = await searchOrder(postdata)
        if (data.length === 0) {
          Toast('搜索结果为空')
        }
        this.orders = data
        this.loading = false
        this.finished = true
      } catch (err) {
        Toast('网络请求失败')
        this.loading = false
        this.error = true
      }
    },
    search (val) {
      this.searchOrders(val)
    },
    openSearch () {
      this.searchStatus = true
    },
    closeSearch () {
      this.searchStatus = false
      this.orders = []
    }
  }
}
</script>

<style scoped lang="less">
.searchOrderList {
  position: relative;
  height: 72vh;
  overflow-y: auto;
}
@media only screen and (max-height: 736px) {
  .searchOrderList {
    height: 60vh;
  }
}
</style>
