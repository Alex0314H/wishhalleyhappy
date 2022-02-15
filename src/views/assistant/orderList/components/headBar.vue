<template>
<div class="orderListHeader"  >
    <div class="NavBar">
        <van-icon name="arrow-left" color=black size=24 @click="backPage"/>
        <div class="title" v-if="!$store.state.searchStatus" v-show="!this.$route.query.searchStatus"> 报修进度</div>
        <div class="add" @click="createOrder" v-if="!$store.state.searchStatus&&$store.state.user.role!=='supplier'" v-show="!this.$route.query.searchStatus">新建订单</div>
    </div>
    <form action="/">
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
      </form>
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
    if (this.$route.query.searchStatus) {
      this.$refs.search.querySelector('input').click()
      this.$refs.search.querySelector('input').focus()
    }
  },
  methods: {
    createOrder () {
      this.$router.push('storeList?createOrder=true')
    },
    backPage () {
      this.$router.push('home')
    }
  }
}
</script>

<style scoped lang="less">
.orderListHeader{
  position: sticky;
  top:0px;
  z-index:2;
  height: 180px;
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
  .van-search{
    position: absolute;
    width: 100%;
    top: 120px;
  }
  .van-search__content {
    background-color:rgba(234, 234, 234,0.42);
    ::before{
    color: rgba(153, 153, 153, 1);
    }
    ::placeholder{
    color: rgba(153, 153, 153, 1);
    }
  }
}
</style>
