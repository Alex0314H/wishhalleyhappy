<template>
  <div class="ListBar">
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="(listType, index) in listTypes" :key="index" :title="listType.type">
        <list :getItems="listType.getItems" :type="type" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import list from '@/components/list.vue'
export default {
  name: 'Lister',
  components: {
    list
  },
  props: ['listTypes', 'type'],
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    if (this.$route.query.orderType === 'past') {
      this.active = 1
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>
