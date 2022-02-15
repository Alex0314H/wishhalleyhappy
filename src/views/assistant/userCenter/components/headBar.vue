<template>
<div class="orderListHeader"  >
    <div class="NavBar">
        <van-icon name="arrow-left" color=black size=24 @click="$router.go(-1)"/>
        <div class="title">个人中心</div>
    </div>

</div>
</template>
<script>

export default {
  name: 'orderListHeader',
  components: {},
  props: ['back'],
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
  }
}
</script>

<style scoped lang="less">
.orderListHeader{
  margin-bottom: 10px;
  position: sticky;
  top:0px;
  z-index:2;
  height: 80px;
  background: #FFFFFF;
  padding-top: 34px;
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
  }
}
</style>
