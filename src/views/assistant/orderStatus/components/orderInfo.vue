<template>
<div class="orderInfo">
    <div class="type">{{ this.fixItem[this.getItem.indexOf(this.order.formname)] }}</div>
    <div class="time">{{ order.formtime }}</div>
    <div class="describe">{{ order.formcontent}}</div>
    <!-- 订单图片 -->
       <van-image
        @click="show(index,images=order.formimgs)"
        v-for="(img,index) in order.formimgs"
        :key="index"
          :src="img"
          width="8.94rem"
          height="6.7rem"
          fit="cover"
        />
    <!-- 店员备注 -->
    <div class="remark" v-if="order.formremark!==''">订单备注:{{order.formremark}}</div>
    <!-- 订单编号 -->
    <div class="number" >订单编号:{{ order.formid }}</div>
    <!-- 供应商备注 -->
    <div class="remark" v-if="order.supplierremark!==''">供应商备注:{{order.supplierremark}}</div>
    <!-- 订单完成情况 -->
    <div class="finishCondition" v-if="order.formstate>4">
      <div class="title">订单完成情况</div>
        <van-image
        @click="show(index,images=order.supplierimg1s)"
        v-for="(img,index) in order.supplierimg1s"
        :key="index"
        width="2.8rem"
        height="2.8rem"
        :src="img"
        fit="scale-down"
        />
      <div class="remark">维修员备注:{{order.supplierremark1}}</div>
    </div>
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
      fixItem: [
        'Fixture',
        'Acc',
        'Window Wall',
        'Flooring',
        'Lighting',
        'LED',
        'Logo New',
        'Mannequin New',
        'Hanger',
        'Special',
        'Logo',
        'Mannequin'
      ],
      getItem: [
        'Fixture',
        'Acc',
        'WindowWall',
        'Flooring',
        'Lighting',
        'LED',
        'LogoNew',
        'MannequinNew',
        'Hanger',
        'Special',
        'Logo',
        'Mannequin'
      ]
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
      var pushphoto = () => {
        this.$store.commit('previewPhoto')
      }
      pushphoto()
      ImagePreview({
        images,
        showIndex: true,
        loop: false,
        startPosition: index,
        getContainer () {
          return document.querySelector('.preiviewPhoto')
        },
        onClose () {
          pushphoto()
        }
      })
      // ImagePreview().onClose()
      // ImagePreview().onClose = () => {
      //   console.log(this)
      // }
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
    font-size: 18px;
    // font-family: DIN;
  }
  // 上传时间
  .time{
    height: 17px;
    font-size: 12px;
    color: #999999;
    margin-top: 6px;
  }
  // 问题描述
  .describe{
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
  .finishCondition{
    margin: 12px -20px 0px -20px;
    padding-left: 20px;
    font-size: 13px;
    font-family: PingFang Bold;
    background: #FFFFFF;
    .title{
      height: 18px;
      color: #000000;
      margin-bottom: 8px;
      padding-top: 8px;
    }
    .van-image{
      border-radius: 4px ;
      margin: 5px 10px 5px 0;
    }
    .button{
    display: inline-block;
    margin: 10px 20px 20px 0;
    width: 157px;
    height: 40px;
    background: #000000;
    border-radius: 6px;
    text-align: center;
    padding-top: 13px;
    color: #FFFFFF;
    }
  }
}
</style>
