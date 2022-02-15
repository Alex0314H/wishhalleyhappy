<template>
  <div class="person" @click="click&&postOrder()">
        <van-image round width="40" height="40" :src="person.userFace" />
        <div class="inform">
          <div class="name">{{person.suppliername ? person.suppliername: person.storename}}</div>
          <div class="phone">{{person.name}}:{{person.phone}}</div>
        </div>
        <div class="arrowRight">
          <van-image width="24" height="24" :src="require('@/assets/pic/arrow-right.svg')" />
        </div>

  </div>
</template>
<script>
export default {
  name: 'person',
  components: {},
  props: { person: Object, click: { type: Boolean, default: false } },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    postOrder () {
      if (this.person.suppliername) {
        this.$store.commit('setSupplier', this.person)
        this.$router.push('supplierStatus')
      } else if (this.person.storename) {
        this.$store.commit('setStore', this.person)
        this.$router.push('storeStatus')
      }
    }
  }
}
</script>

<style scoped lang="less">
.person{
    margin-left: 20px;
    margin-top: 12px;
    width: 335px;
    height: 67px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    border: 1px solid #E9E9E9;
    display: flex;
    padding: 12px;
    font-family: PingFang Bold;
    .inform{
      margin-left: 8px;
      flex: 1;
      .name{
        font-size: 15px;
        color: #333333;
        line-height: 21px;
      }
      .phone{
        font-size: 13px;
        color: #999999;
        line-height: 18px;
        margin-top: 4px;
      }
    }
  }
</style>
