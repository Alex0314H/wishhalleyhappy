<template>
  <div class="notification-full">
    <van-swipe ref="swipe" @change="onChange" class="my-swipe" :initial-swipe="current" >
      <van-swipe-item v-for="order in orders" :key="order.id">
        <order :order="order" click/>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current+1 }}/{{orders.length}}</div>
      </template>
    </van-swipe>
  </div>
</template>
<script>
import { getNotification } from '@/api/user'
import order from '@/components/infoBar/orderBar.vue'
export default {
  name: 'notification-full',
  components: {
    order
  },
  props: [],
  data () {
    return {
      current: 0,
      orders: []
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    this.getOrders()
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getOrders (id) {
      this.current = id
      const { data } = await getNotification()
      this.orders = data.reverse()
      this.$refs.swipe.resize()
    }
  }
}
</script>

<style scoped lang="less">
.notification-full {
  border-radius: 8px;
  .my-swipe {
      background-color: white;
       border-radius: 8px;
    .order {
      margin: 0;
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
