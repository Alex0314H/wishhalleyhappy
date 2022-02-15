<template>
  <div class="supplement" @click="click&&postOrder()">
    <div class="titile">
        <div class="storename">{{supplement.supplementstorename}}</div>
      <div class="status">{{ status[supplement.supplementstate - 1] }}</div>
    </div>
    <div class="imglist">
      <div class="img" v-for="(img, index) in supplement.supplementimgs" :key="index">
        <van-image width="98" height="98" :src="img" fit="cover" />
      </div>
    </div>
    <div class="address">{{ supplement.supplementstoresite }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'supplement',
  components: {},
  props: { supplement: Object, click: { type: Boolean, default: false } },
  data () {
    return {
      status: [
        '等待区域经理审核',
        '等待品牌审核',
        '调取单已分配']
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    postOrder () {
      this.$store.commit('setOrder', this.supplement)
      this.$router.push('supplementStatus')
    }
  }
}
</script>

<style scoped lang="less">
.supplement {
  display: flex;
  flex-direction: column;
  padding: 13px 12px 12px 12px;
  width: 335px;
  background-color: rgba(255, 255, 255, 1);
  margin: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  .titile {
    font-weight: 600;
    width: 311px;
    height: 22px;
    line-height: 18px;
    margin-bottom: 10px;
    .storename {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      float: left;
    }
    .status {
      font-size: 13px;
      color: rgba(255, 0, 0, 1);
      float: right;
    }
  }

  .img {
    width: 98px;
    height: 98px;
    margin: auto;
    float: left;
    margin: 8px 9px 0px 0;
    .van-image__img {
      border-radius: 4px;
    }
  }
  .address {
    display: inline;
    padding-top: 12px;
    font-size: 13px;
    line-height: 18px;
    color: rgba(153, 153, 153, 1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
