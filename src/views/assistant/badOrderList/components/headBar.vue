<template>
<div class="orderListHeader"  >
    <div class="NavBar">
        <van-icon name="arrow-left" color=black size=24 @click="backPage"/>
        <div class="title">不合格维修单</div>
        <!-- <div class="add" @click="go" v-if="!this.$store.state.searchStatus&&!this.$route.path==='/supplier/orderList'" v-show="!this.$route.query.searchStatus">新建订单</div> -->
    </div>
    <!-- <form action="/">
      <van-search
      ref="search"
      v-model="value"
      placeholder="请输入订单号/订单类型"
      @click="$parent.openSearch"
      @search="$parent.search"
      @cancel="$parent.closeSearch"
      shape="round"
      :show-action=searchStatus
      background="transparent"
      />
      </form> -->
</div>
</template>
<script>

export default {
  name: 'orderListHeader',
  components: {},
  props: ['back', 'searchStatus'],
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    go () {
      this.$router.push('storeList')
      this.$store.commit('setUserStatus', 'repair')
    },
    backPage () {
      this.$router.push('manage')
    }
  }
}
</script>

<style scoped lang="less">
.orderListHeader{
  position: sticky;
  top:0px;
  z-index:2;
  height: 120px;
  background: #FFFFFF;
  padding-top: 54px;
  .NavBar{
    position: relative;
    text-align: center;
    .van-icon-arrow-left{
      position: absolute;
      left: 20px;
      top:9px;
    }
    .title{
      display: inline-block;
      font-size: 22px;
      font-family: PingFang Bold;
      color: #333333;
    }
    .add{
      font-size: 11px;
      font-family: PingFang Bold;
      text-align: center;
      padding-top: 5px;
      position: absolute;
      right: 10px;
      top:9px;
      width: 88px;
      height: 24px;
      border: 1px solid#666666;;
      border-radius: 20px;
    }
  }
  // .van-search{
  //   position: absolute;
  //   width: 100%;
  //   top: 120px;
  // }
  // .van-search__content {
  //   background-color:rgba(234, 234, 234,0.42);
  //   ::before{
  //   color: rgba(153, 153, 153, 1);
  //   }
  //   ::placeholder{
  //   color: rgba(153, 153, 153, 1);
  //   }
  // }
}
</style>
