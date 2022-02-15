<template>
  <div class="orderList-container">
    <!-- 头部 -->
    <headBar ref="headBar" back="home" />
    <!-- 订单列表 -->
    <listBar
      :listTypes="listTypes"
      type="order"
    />
    <!-- 搜索订单 -->
    <!-- <div class="searchOrderList" v-show="searchStatus">
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
    </div> -->
  </div>
</template>

<script>
import { getOngoingBadOrderList, getPastBadOrderList } from '@/api/user'
import headBar from './components/headBar.vue'
import listBar from '@/components/listBar.vue'
// import order from '@/components/infoBar/orderBar.vue'
export default {
  name: 'orderList',
  components: {
    listBar,
    headBar
    // order
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
          type: '待处理不合格维修',
          async getItems () {
            const { data } = await getOngoingBadOrderList()
            return data
          }
        },
        {
          type: '历史不合格维修',
          async getItems () {
            const { data } = await getPastBadOrderList()
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
  }
}
</script>

<style scoped lang="less">
.searchOrderList {
  position: relative;
  height: 72vh;
  overflow-y: auto;
}
/deep/.van-tabs {
  .van-tabs__wrap {
    z-index: 1;
    height: 42px;
    position: sticky;
    top: 100px;
    .van-tab {
      font-family: PingFang Bold;
      font-size: 18px;
      color: rgba(102, 102, 102, 1);
    }
    .van-tab--active{
      color:rgba(0, 0, 0, 1);
    }
    .van-tabs__line {
      height: 2px;
      background-color:rgba(0, 0, 0, 1);
    }
  }
}
@media only screen and (max-height: 736px) {
  .searchOrderList {
    height: 60vh;
  }
}
</style>
