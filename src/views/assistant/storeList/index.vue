<template>
  <div class="inquire-storeList-container">
    <!-- 头部背景 -->
    <div class="header">
      <van-icon  name="arrow-left" color=white size=24 @click="$router.go(-1)"/>
      <van-image  :src="require('@/assets/pic/repair-choose-banner.png')" />
    </div>
    <!-- tab标签页 -->
    <van-loading v-show="!finished&&!err" size="24px">加载中...</van-loading>
    <div class="err" @click="getOrderTypes" v-show="err">加载失败,请重试</div>
    <listBar v-show="finished" :listTypes="listTypes" type="store" />
  </div>
</template>

<script>
import { getStoreList } from '@/api/user'
import listBar from '@/components/listBar.vue'
export default {
  name: 'StoreListPage',
  components: {
    listBar
  },
  props: {
  },
  data () {
    return {
      listTypes: [],
      finished: false,
      err: false,
      loading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getOrderTypes()
  },
  mounted () {},
  methods: {
    async getOrderTypes () {
      try {
        this.err = false
        const { data } = await getStoreList()
        if (data.FOC) {
          this.listTypes.push(
            {
              type: 'FOC',
              async getItems () {
                const { data } = await getStoreList()
                return data.FOC
              }
            }
          )
        }
        if (data.FPS) {
          this.listTypes.push(
            {
              type: 'FPS',
              async getItems () {
                const { data } = await getStoreList()
                return data.FPS
              }
            }
          )
        }
        this.finished = true
      } catch {
        this.err = true
        this.$toast('加载店铺列表失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.inquire-storeList-container{
  .header{
  position: sticky;
  top:0px;
  z-index: 1;
  height: 180px;
  width: 375px;
    .van-icon-arrow-left{
      z-index: 1;
      position:absolute;
      left: 20px;
      top: 63px;
    }
  }
  .van-loading{
    margin-top: 30px;
    margin-left: 130px;
  }
  .err{
    margin-top: 30px;
    margin-left: 130px;
    color: #969799;
    font-size: 0.37333rem;
  }
}
</style>
