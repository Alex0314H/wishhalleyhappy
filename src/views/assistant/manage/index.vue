<template>
  <div class="manage-container">
    <!-- 头部图片 -->
    <van-image :src="require('@/assets/pic/manage-img.png')" />
    <!-- 中间模块 -->
    <div class="title">工具与服务</div>
    <div class="toolsList">

      <div class="tool">
        <van-image :src="require('@/assets/pic/manage-store-manage.png')" @click="manage"/>
        店铺管理
      </div>

      <div class="tool"
        v-if="$store.state.user.role==='assistant'||'brand'">
        <van-image :src="require('@/assets/pic/manage-quick-fix.png')" @click="$toast('该功能后续开发中')"/>
        快速报修
      </div>

      <div class="tool"
        v-if="$store.state.user.role==='brand'" >
        <van-image :src="require('@/assets/pic/manage-contact.png')" @click="$router.push('contact')"/>
        通讯录
      </div>

        <div class="tool"
        v-if="$store.state.user.role==='assistant'||'brand'||'areaManager'" >
        <van-image :src="require('@/assets/pic/manage-propsSupplement.png')" @click="$router.push('supplementList')"/>
        道具增补
      </div>

      <div class="tool" >
        <van-image :src="require('@/assets/pic/manage-disqualification-order.png')" @click="$router.push('badOrderList')"/>
        不合格维修单
      </div>
      <div class="tool">
        <van-image :src="require('@/assets/pic/manage-storeProps.png')" @click="$router.push('storeList?storeProps=true')"/>
        店铺物品
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'management',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    manage () {
      this.$router.push('storeList')
    }
  }
}
</script>

<style scoped lang="less">
.manage-container {
  .title {
    margin-top: 24px;
    margin-left: 20px;
    font-size: 18px;
    font-family: PingFang Bold;
  }
  .toolsList {
    // height: 400px;
    font-size: 13px;
    font-family: PingFang Regular;
    color: rgba(102, 102, 102, 1);
    .tool {
      display: inline-flex;
      width: 25%;
      flex-direction: column;
      height: 54px;
      margin-top: 20px;
      text-align: center;
      .van-image {
        width: 24px;
        margin: 0 auto;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
