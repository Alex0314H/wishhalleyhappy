<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!--
      route: 开启路由模式
     -->
    <van-tabbar v-model="active" route>

      <van-tabbar-item to='/home'>
        <template #icon="props">
          <van-image v-show="props.active" :src="home.active" />
          <van-image v-show="!props.active" :src="home.inactive" />
        </template>
        首页
      </van-tabbar-item>

      <van-tabbar-item to='/manage'>
        <template #icon="props">
          <van-image v-show="props.active" :src="manage.active" />
          <van-image v-show="!props.active" :src="manage.inactive" />
        </template>
        管理
      </van-tabbar-item>

      <van-tabbar-item to='/mine'>
        <template #icon="props">
          <van-image v-show="props.active" :src="mine.active" />
          <van-image v-show="!props.active" :src="mine.inactive" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      home: {
        active: require('@/assets/pic/home.active.svg'),
        inactive: require('@/assets/pic/home.svg')
      },
      manage: {
        active: require('@/assets/pic/manage.active.svg'),
        inactive: require('@/assets/pic/manage.svg')
      },
      mine: {
        active: require('@/assets/pic/mine.active.svg'),
        inactive: require('@/assets/pic/mine.svg')
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  .van-tabbar-item {
    color: #cbcfd8;
    font-size: 11px;
  }
  .van-tabbar-item--active {
    color: #333333;
    .van-tabbar-item__icon {
      color: pink;
    }
  }
}
</style>
