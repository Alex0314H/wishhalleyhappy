<template>
  <div class="brand-contacts-supplierStatus-container">
    <!-- 头部 -->
    <div class="head" >
      <div class="a">
          <van-icon name="arrow-left" color=black size=24 @click="$router.go(-1)"/>
      </div>
      <div class="title">
        供应商详情
      </div>
      <div class="supplier">
        <van-image round width="40" height="40" :src="require('@/assets/pic/test-brand-supplier.png')" />
        <div class="inform">
          <div class="name">{{supplier.suppliername}}</div>
          <div class="phone">{{supplier.name}}:{{supplier.phone}}</div>
        </div>
        <div class="arrowRight">
          <van-image width="24" height="24" :src="require('@/assets/pic/arrow-right.svg')" />
        </div>
      </div>
    </div>

    <!-- 标签页 -->
    <listBar
      :listTypes="listTypes"
      type="order"
    />
  </div>
</template>

<script>
import { GetSupplierOnGoingOrder, GetSupplierPastOrder } from '@/api/brand-contact'
import listBar from '@/components/listBar.vue'
export default {
  name: 'brand-contacts-supplierStatus',
  components: {
    listBar
  },
  props: {},
  data () {
    return {
      value: '',
      active: 0,
      supplier: this.$store.state.supplier,
      listTypes: [
        {
          type: '进行中的报修',
          async getItems () {
            const postdata = this.$qs.stringify({
              storeSupplier: this.$store.state.supplier.suppliername
            })
            const { data } = await GetSupplierOnGoingOrder(postdata)
            return data
          }
        },
        {
          type: '已完成的报修',
          async getItems () {
            const postdata = this.$qs.stringify({
              storeSupplier: this.$store.state.supplier.suppliername
            })
            const { data } = await GetSupplierPastOrder(postdata)
            return data
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
.brand-contacts-supplierStatus-container{
.head{
  z-index: 2;
    position: fixed;
    top: 200;
    width: 375px;
    height: 180px;
    background: #FFFFFF;
    padding-top: 54px;
    .a{
      margin-top: -9px;
      z-index: 2;
      padding-left: 20px;
      margin-bottom: 12px;
      float: left;
    }
    .title{
    font-size: 18px;
    line-height: 25px;
    font-family: PingFang Bold;
    color: #333333;
    padding-left: 98px;
    float: left;
    }
    .supplier{
    margin-left: 24px;
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
  }
  // 标签栏
/deep/.van-tabs{
        padding-top: 220px;
        .van-tabs__wrap {
          position: fixed;
          top: 180px;

          left: 0;
          right: 0;
        }
        .van-tab{
          font-family: PingFang Bold;
          color: rgba(102, 102, 102, 1);
          font-size: 15px;
        }
        .van-tab--active{
          color:rgba(0, 0, 0, 1);
        }
        .van-tabs__line {
          height: 2px;
          background-color:rgba(0, 0, 0, 1);
        }
      }
}
</style>
