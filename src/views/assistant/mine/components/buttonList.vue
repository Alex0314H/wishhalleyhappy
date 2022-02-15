<template>
<div class="buttonList">
      <van-cell title="关于我们" is-link url="">
        <template #icon>
          <van-image :src="require('@/assets/pic/mine-about-us.svg')"/>
        </template>
      </van-cell>
      <van-cell title="个人中心" is-link to="userCenter">
        <template #icon>
          <van-image :src="require('@/assets/pic/mine-security-center.svg')"/>
        </template>
      </van-cell>
      <van-cell title="清除缓存" is-link url="">
        <template #icon>
          <van-image :src="require('@/assets/pic/mine-clear-cache.svg')"/>
        </template>
      </van-cell>
    </div>
</template>
<script>

export default {
  name: 'buttonList',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.buttonList{
    .van-cell{
      background-color: rgba(241, 241, 241, 1);
      span{
      padding-left: 12px;
      height: 21px;
      font-size: 15px;
      font-family: 'PingFang Bold';
      color: rgba(51, 51, 51, 1);
      }
      .van-cell__right-icon{
        padding-right: 10px;
      }
    }
  }
</style>
