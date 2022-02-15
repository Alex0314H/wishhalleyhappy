<template>
<div class="list">
  <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-if="type == 'order'">
          <order v-for="(item, id) in items" :key="id" click :order="item" />
        </div>
        <div v-if="type == 'store'">
          <store v-for="(item, id) in items" :key="id" click :store="item" />
        </div>
        <div v-if="type == 'person'">
          <person v-for="(item, id) in items" :key="id" click :person="item" />
        </div>
        <div v-if="type == 'supplementBar'">
          <supplement v-for="(item, id) in items" :key="id" click :supplement="item" />
        </div>
      </van-list>
    </van-pull-refresh>
</div>
</template>
<script>
import person from '@/components/infoBar/personBar.vue'
import order from '@/components/infoBar/orderBar.vue'
import store from '@/components/infoBar/storeBar.vue'
import supplement from '@/components/infoBar/supplementBar.vue'
export default {
  name: 'list',
  components: {
    order,
    store,
    person,
    supplement
  },
  props: ['getItems', 'type'],
  data () {
    return {
      items: [],
      loading: false, // 加载状态
      finished: false, // 加载完成状态
      error: false, // 加载错误状态
      isreFreshLoading: false, // 刷新状态
      refreshSuccessText: '刷新成功' // 刷新成功文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 获取数据
    async onLoad () {
      try {
        this.items = await this.getItems()
        this.loading = false
        this.finished = true
      } catch (err) {
        console.log('请求失败', err)
        this.loading = false
        this.error = true
      }
    },
    // 刷新数据
    async onRefresh () {
      try {
        this.items = await this.getItems()
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新成功'
      } catch (err) {
        console.log('请求失败', err)
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-list{
  min-height: 60vh;
}

.list{
  height: 72vh;
  overflow-y: auto;
}

@media only screen
and (max-height:736px)
 {
  .list{
    height: 60vh;
    overflow-y: auto;
  }
}
</style>
