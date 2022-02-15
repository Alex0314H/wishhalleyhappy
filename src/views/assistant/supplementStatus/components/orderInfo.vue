<template>
<div class="orderInfo">
    <div class="type">{{ (this.order.supplementstorename) }}</div>
    <div class="time">{{ order.supplementstoresite }}</div>
    <!-- 订单图片 -->
    <van-image
    @click="show(index,images=order.supplementimgs)"
    v-for="(img,index) in order.supplementimgs"
    :key="index"
      :src="img"
      width="8.94rem"
      height="6.7rem"
      fit="cover"
    />
    <div class="describe"
    v-for="(supplementgoods,index) in order.supplementgoodss"
    :key="index">{{ supplementgoods}}×{{order.supplementcounts[index]}}
    </div>
    <div class="time">{{ order.supplementbegintime }}</div>

    <!-- 订单编号 -->
    <div class="number" >订单编号:{{ order.supplementid }}</div>

</div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
  name: 'orderInfo',
  components: {},
  props: ['order'],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    // 图片点击可以预览
    show (index, images) {
      ImagePreview({
        images,
        showIndex: true,
        loop: false,
        startPosition: index
      })
    }
  }
}
</script>

<style scoped lang="less">
.orderInfo{
   font-family: PingFang Bold;
   color: #333333;
   padding:0 20px;
   // 维修类型
  .type{
    margin-top: 20px;
    font-size: 18px;
    font-family: bold;
  }
  // 上传时间
  .time{
    height: 17px;
    font-size: 12px;
    color: #999999;
    margin-top: 12px;
  }
  // 问题描述

  .describe{
    width: 50%;
    font-size: 15px;
    margin-top: 12px;
    margin-bottom: 20px;
  }
  // 备注信息
  .remark{
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 13px;
    line-height: 16px;
    color: #999999;
  }
  // 订单编号
  .number{
    height: 34px;
    background: #FFFFFF;
    margin: 20px -20px 0 -20px;
    font-size: 13px;
    color: #000000;
    padding-top: 10px;
    padding-left: 20px;
  }
}
</style>
