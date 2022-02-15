<template>
  <div class="orderList-container">
    <!-- 头部 -->
    <headBar/>
    <!-- 订单列表 -->
    <listBar
      :listTypes="listTypes"
      type="supplementBar"
    />
  </div>
</template>

<script>
import { getOngoingSupplement, getPastSupplement } from '@/api/user'
import headBar from './components/headBar.vue'
import listBar from '@/components/listBar.vue'
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
          type: '进行中增补',
          async getItems () {
            const { data } = await getOngoingSupplement()
            return data
          }
        },
        {
          type: '已完成增补',
          async getItems () {
            const { data } = await getPastSupplement()
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
