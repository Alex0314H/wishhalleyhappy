<template>
<div class="propsSupplementHeader">
      <!-- 导航条 -->
      <div class="navBar">
        <!-- 返回按钮 -->
        <van-icon name="arrow-left" @click="$router.go(-1)"/>
        <!-- 标题 -->
        <div class="title">新建增补</div>
      </div>
    </div>
</template>
<script>

export default {
  name: 'propsSupplementHeader',
  components: {},
  props: [],
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
  }
}
</script>

<style scoped lang="less">
.propsSupplementHeader{
  height: 110px;
  background-color: rgba(255, 255, 255, 1);
  padding-top: 54px;
  .navBar{
    position: relative;
    text-align: center;
    .van-icon-arrow-left{
      font-size: 24px;
      position: absolute;
      left: 20px;
      top:9px;
    }
    .title{
      font-size: 22px;
      color:rgba(51, 51, 51, 1);
    }
  }
}
</style>
