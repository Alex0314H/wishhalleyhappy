<template>
<div class="store" @click="click&&postStore()">
    <div class="top">
    <div class="left">
        <div class="name" >{{ store.storename }}</div>
        <div class="user">{{ store.name }}:{{ store.phone }}</div>
    </div>
    <van-image
        width="80"
        height="80"
        :src="store.storeimg"
    />
    </div>

    <div class="address">地址:{{ store.storesite }}</div>
</div>
</template>
<script>

export default {
  name: 'storeBar',
  components: {},
  props: { store: Object, click: { type: Boolean, default: false } },
  data () {
    return {
    }
  },
  computed: {},
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    postStore () {
      this.$store.commit('setStore', this.store)
      if (this.$route.query.createOrder) {
        this.$router.push('createOrder')
      } else if (this.$route.query.supplement) {
        this.$router.push('createSupplement')
      } else if (this.$route.query.storeProps) {
        this.$router.push('storeProps')
      } else {
        this.$router.push('storeStatus')
      }
    }
  }
}
</script>

<style scoped lang="less">
.store{
  display: flex;
  flex-direction:column;
  padding: 20px 12px 16px 12px ;
  width: 335px;
  height: 138px;
  background-color: rgba(255, 255, 255, 1);
  margin: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  .top{
    display: flex;
    .left{
      width: 231px;
      height: 86px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      .name{
        font-weight: 600;
        font-size: 18px;
        color:rgba(51, 51, 51, 1);
        width: 201px;
        height: 50px;
        line-height:25px ;
      }
      .user{
        font-weight: 600;
        padding-top: 10px;
        font-size: 13px;
        color:rgba(0, 0, 0, 1);
        width: 140px;
        height: 18px;
      }
    }
    .van-image__img{
      margin-top: -4px;
      border-radius: 8px;
    }
  }
  .address{
    font-family: PingFang Regular;
    color:rgba(153, 153, 153, 1);
    font-size:13px
  }
}
</style>
