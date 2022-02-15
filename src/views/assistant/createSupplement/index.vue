<template>
  <div class="supplement-container">
    <!-- 头部 -->
    <headBar/>
    <!-- 填写订单 -->
    <order ref="order" :id="id" />
  </div>
</template>

<script>
import headBar from './components/headBar.vue'
import order from './components/createOrderBar.vue'
export default {
  name: 'supplement',
  components: {
    headBar,
    order
  },
  props: {},
  data () {
    return {
      id: this.$store.state.store.id
    }
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
.supplement-container {

}
</style>
