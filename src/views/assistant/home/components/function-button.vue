<template>
  <div>
    <div class="functionButton">
      <van-image
        :src="require(`@/assets/pic/home-button-${icon}.png`)"
      />
      <div class="describe">
        <div class="title">{{ title }}</div>
        <div>{{ text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'functionButton',
  components: {},
  props: ['icon', 'title', 'text'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
.functionButton {
  float: left;
  display: flex;
  width: 162px;
  height: 98px;
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
  margin: 20px -10px 0 20px;
  .van-image {
    width: 36px;
    height: 32px;
    margin: 33px 0 0 10px;
  }
  .describe {
    margin: auto;
    font-size: 12px;
    color: #999999;
    // 上方标题文本
    .title {
      font-size: 22px;
      color: #333333;
      margin-bottom: 10px;
    }
  }
}
</style>
