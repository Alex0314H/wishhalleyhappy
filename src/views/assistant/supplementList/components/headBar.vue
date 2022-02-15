<template>
<div class="supplementListHeader"  >
    <div class="NavBar">
        <van-icon name="arrow-left" color=black size=24 @click="backPage"/>
        <div class="title">道具增补</div>
        <div class="add" @click="go" v-if="$store.state.user.role==='assistant'">新建订单</div>
    </div>
</div>
</template>
<script>

export default {
  name: 'supplementList-headBar',
  components: {},
  props: [],
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
      this.$router.push({ path: 'storeList', query: { supplement: true } })
    },
    backPage () {
      this.$router.push('manage')
    }
  }
}
</script>

<style scoped lang="less">
.supplementListHeader{
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
}
</style>
