<template>
  <div class="order" @click="click&&postOrder()">
    <div class="titile">
      <div class="type">{{ fixItem[this.getItem.indexOf(this.order.formname)] }}（{{ order.expire==='1' ? '保修中': '已过期'}}）</div>
      <div class="status">{{ status[order.formstate - 1] }}</div>
    </div>
    <div class="describe">
      <div class="text">{{ order.formcontent }}</div>
    </div>
    <div class="imglist">
      <div class="img" v-for="(img, index) in order.formimgs" :key="index">
        <van-image width="98" height="98" :src="img" fit="cover" />
      </div>
    </div>
    <div class="address">{{ order.storesite }}
        <div v-if="order.rejest==='0'&&this.$store.state.user.role!=='supplier'" class="reject">曾被供应商驳回</div>
        <div v-if="order.nofid!=='0'||order.nosid!=='0'" @click.stop="postBadOrder" class="reject">查看关联维修单</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'order',
  components: {},
  props: { order: Object, click: { type: Boolean, default: false } },
  data () {
    return {
      status: [
        '供应商待分配',
        '工人待分配',
        '工人到店中',
        '工人维修中',
        '订单待确认',
        '店长已确认',
        '订单已完成'],
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
  created () {
  },
  mounted () {
  },
  methods: {
    postOrder () {
      this.$store.commit('setOrder', this.order)
      if (this.$route.name === 'badOrderList') {
        this.$router.push({ path: 'orderStatus', query: { badOrderList: true } })
      } else {
        this.$router.push('orderStatus')
      }
    },
    postBadOrder () {
      this.order.id = this.order.nofid === '0' ? this.order.nosid : this.order.nofid
      this.$store.commit('setOrder', this.order)
      if (this.order.nofid === '0') {
        this.$router.push('orderStatus')
      } else {
        this.$router.push({ path: 'orderStatus', query: { badOrderList: true } })
      }
    }
  }
}
</script>

<style scoped lang="less">
.order {
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
    .type {
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
  .describe {
    width: 311px;
    .text {
      font-size: 15px;
      color: rgba(51, 51, 51, 1);
      float: left;
      min-height: 15px;
      width: 280px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .button {
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 0, 0, 1);
      float: right;
    }
  }
  .imglist {
    width: 321px;
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
    font-family: PingFang Regular;
    line-height: 18px;
    color: rgba(153, 153, 153, 1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .reject {
    display: inline;
    font-family: PingFang Bold;
    font-size: 14px;
    color: rgba(255, 0, 0, 1);
    float:right;
  }
  }
}
</style>
