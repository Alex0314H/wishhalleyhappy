<template>
  <div class="cantact-container">
    <!-- 头部 -->
    <div class="head" >
      <div class="a">
        <router-link  to="manage">
          <van-icon name="arrow-left" color=black size=24 />
        </router-link>
      </div>
      <div class="title">
          通讯录
      </div>
    </div>
    <div class="blank"></div>
    <!-- 标签页 -->
    <listBar
      :listTypes="listTypes"
      type="person"
    />
  </div>
</template>

<script>
import { contactGetAssistant, contactGetSupplier } from '@/api/brand-contact'
import listBar from '@/components/listBar.vue'
export default {
  name: 'cantact',
  components: {
    listBar
  },
  props: {},
  data () {
    return {
      value: '',
      active: 0,
      listTypes: [
        {
          type: '供应商',
          async getItems () {
            const { data } = await contactGetSupplier()
            return data
          }
        },
        {
          type: '店长',
          async getItems () {
            const { data } = await contactGetAssistant()
            return data
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async getSupplier () {
      const { data } = await contactGetSupplier()
      return data
    },
    async getAssistant () {
      const { data } = await contactGetAssistant()
      return data
    }
  }
}
</script>

<style scoped lang="less">
.cantact-container{
.head{
  z-index: 2;
    position: fixed;
    display: flex;
    top: 200;
    width: 375px;
    height: 130px;
    background: #FFFFFF;
    padding-top: 54px;
    .a{
      z-index: 2;
      margin-top: -11px;
      padding-left: 20px;
      margin-bottom: 12px;
    }
    .title{
    width: 80px;
    margin-left: 115px;
    height: 25px;
    font-size: 18px;
    font-family: PingFang Bold;
    color: #333333;
    }
  }
  .blank{
    height: 130px;
  }
  // 标签栏
/deep/.van-tabs{
        .van-tabs__wrap {
          top: 103px;
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
        .ListBar{
          /deep/.van-list{
          min-height: 78vh;
          overflow-y: auto;
          }
          /deep/.list{
          height: 78.7vh;
          overflow-y: auto;
          }
      }
}
</style>
