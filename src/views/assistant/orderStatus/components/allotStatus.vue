<template>
<div class="allotStatus">
    <div class="alloting" v-if="type=='supplier'&&order.formstate==1">
      <div class="status">
          <van-image :src="require(`@/assets/pic/order-status-${type}.svg`)" />
          <div class="text">未分配供应商</div>
      </div>
    </div>
    <div class="alloting" v-if="type=='maintainer'&&order.formstate<3">
      <div class="status">
        <van-image :src="require(`@/assets/pic/order-status-${type}.svg`)" />
        <div class="text">未分配维修员</div>
      </div>
    </div>
    <div class="alloted" v-if="type=='supplier'&&order.formstate>1">
       <div class="status" v-if="type=='supplier'">
          <van-image :src="require(`@/assets/pic/order-status-${type}.svg`)" />
          <div class="text">已分配供应商</div>
       </div>
       <div class="supplierName">{{ order.suppliername }}</div>
       <div class="contact">{{order.supplieruser}}:
          <div class="red">{{ order.supplierphone}}
          </div>
       </div>
    </div>
    <div class="alloted" v-if="type=='maintainer'&&order.formstate>2" >
      <div class="status" v-if="type=='maintainer'">
          <van-image :src="require(`@/assets/pic/order-status-${type}.svg`)" />
          <div class="text">已分配维修员</div>
      </div>
      <div v-if="type=='maintainer'">预计到店:{{order.suppliertime}}</div>
      <div class="contact">{{order.suppliername1}}:
          <div class="red">{{ order.supplierphone1}}
          </div>
      </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'allotStatus',
  components: {},
  props: ['order', 'type'],
  data () {
    return {
      localOrder: {}
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.allotStatus{
    height: 78px;
    width: 167.5px;
    .van-image__img{
        width: 18px;
        height: 18px;
    }
    .status{
        display: flex;
        margin-bottom: 4px;
        font-family: PingFang Bold;
        color: #333333;
        font-size: 13px;
        .text{
            padding-left: 4px;
            padding-top:3px;
        }
    }
    .alloting{
        display: flex;
        margin-left: 30px;
        margin-top: 30px;
    }
    .alloted{
        position:relative;
        display: flex;
        flex-direction:column;
        color: rgba(153, 153, 153, 1);
        margin-left: 10px;
        margin-top: 14px;
        font-size:11px;
        font-family: PingFang Bold;
        margin-bottom: 4px;
        .contact{
            font-size: 13px;
            line-height: 18px;
        }
        .supplierName{
            width: 167px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .red{
            display: inline-block;
            font-family: PingFang Bold;
            color:#FF0000
        }
    }
}
</style>
