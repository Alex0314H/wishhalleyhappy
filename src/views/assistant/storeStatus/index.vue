<template>
  <div class="storeStatus-container">
    <!-- 头部 -->
    <div class="navBar">
      <van-icon
        name="arrow-left"
        color="white"
        size="24"
        @click="$router.go(-1)"
      />
      <van-image :src="require('@/assets/pic/repair-choose-banner.png')" />
    </div>
    <!-- 店铺信息 -->
    <store
      @click.native.once="getStore"
      @click.native="informStatus = !informStatus"
      :store="store"
    />
    <div class="blank"></div>
    <!-- 标签页 -->
    <listBar
      :listTypes="listTypes"
      type="order"
      v-show="!informStatus"
      setItem="setOrder"
    />
    <!-- 供应商查看的信息页 -->
    <div class="supplierList" v-if="this.$store.state.user.role==='supplier'"  v-show="informStatus">
      <div class="supplier">
        <div class="type">{{ store.typename }}</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.typename1 }}</div>
          <div class="time">开始时间:{{ store.typename2 }}</div>
          <div class="time">结束时间:{{ store.typename3 }}</div>
        </div>
      </div>
    </div>
    <!-- 信息页 -->
    <div class="supplierList" v-if="$store.state.user.role==='assistant'||$store.state.user.role==='brand'" v-show="informStatus">
      <div class="supplier">
        <div class="type">Fixture</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.fixture }}</div>
          <div class="time">开始时间:{{ store.fixturebegintime }}</div>
          <div class="time">结束时间:{{ store.fixtureendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">Acc</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.acc }}</div>
          <div class="time">开始时间:{{ store.accbegintime }}</div>
          <div class="time">结束时间:{{ store.accendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">Window Wall</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.windowwall }}</div>
          <div class="time">开始时间:{{ store.windowwallbegintime }}</div>
          <div class="time">结束时间:{{ store.windowwallendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">flooring</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.flooring }}</div>
          <div class="time">开始时间:{{ store.flooringbegintime }}</div>
          <div class="time">结束时间:{{ store.flooringendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">lighting</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.lighting }}</div>
          <div class="time">开始时间:{{ store.lightingbegintime }}</div>
          <div class="time">结束时间:{{ store.lightingendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">LED</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.led }}</div>
          <div class="time">开始时间:{{ store.ledbegintime }}</div>
          <div class="time">结束时间:{{ store.ledendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">LOGO NEW</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.logonew }}</div>
          <div class="time">开始时间:{{ store.logonewbegintime }}</div>
          <div class="time">结束时间:{{ store.logonewendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">Mannequin NEW</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.mannequinnew }}</div>
          <div class="time">开始时间:{{ store.mannequinnewbegintime }}</div>
          <div class="time">结束时间:{{ store.mannequinnewendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">Hanger</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.hanger }}</div>
          <div class="time">开始时间:{{ store.hangerbegintime }}</div>
          <div class="time">结束时间:{{ store.hangerendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">Special</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.special }}</div>
          <div class="time">开始时间:{{ store.specialbegintime }}</div>
          <div class="time">结束时间:{{ store.specialendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">LOGO</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.logo }}</div>
          <div class="time">开始时间:{{ store.logobegintime }}</div>
          <div class="time">结束时间:{{ store.logoendtime }}</div>
        </div>
      </div>
      <div class="supplier">
        <div class="type">Mannequin</div>
        <div class="line"></div>
        <div class="inform">
          <div class="name">{{ store.mannequin }}</div>
          <div class="time">开始时间:{{ store.mannequinbegintime }}</div>
          <div class="time">结束时间:{{ store.mannequinendtime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreOngoingOrder, getStorePastOrder, getStoreWarranty } from '@/api/store'
import store from '@/components/infoBar/storeBar.vue'
import listBar from '@/components/listBar.vue'
export default {
  name: 'storeStatus',
  components: {
    store,
    listBar
  },
  props: {},
  data () {
    return {
      types: [],
      informStatus: false,
      active: 0,
      store: this.$store.state.store,
      listTypes: [
        {
          type: '进行中的报修',
          async getItems () {
            const postdata = this.$qs.stringify({
              storename: this.$store.state.store.storename
            })
            const { data } = await getStoreOngoingOrder(postdata)
            return data
          }
        },
        {
          type: '已完成的报修',
          async getItems () {
            const postdata = this.$qs.stringify({
              storename: this.$store.state.store.storename
            })
            const { data } = await getStorePastOrder(postdata)
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
    async getStore () {
      const postdata = this.$qs.stringify({
        id: this.store.id
      })
      const { data } = await getStoreWarranty(postdata)
      this.store = data
      if (data.typename === 'WindowWall') { data.typename = 'Window Wall' }
      if (data.typename === 'MannequinNew') { data.typename = 'Mannequin New' }
      if (data.typename === 'Led') { data.typename = 'LED' }
    }
  }
}
</script>

<style scoped lang="less">
.storeStatus-container {
  .navBar {
    height: 180px;
    position: sticky;
    top: 0px;
    z-index: 1;
    .van-icon-arrow-left {
      z-index: 2;
      position: absolute;
      left: 20px;
      top: 63px;
    }
  }
  .store {
    z-index: 2;
    position: fixed;
    top: 105px;
  }
  .blank{
    height: 83px;
  }
  // 标签栏
  /deep/.van-tabs {
    .van-tabs__wrap {
      top: 263px;
    }
    .van-tab {
      font-size: 15px;
      background: rgba(241, 241, 241, 1);
    }
  }
  .ListBar{
  /deep/.van-list{
  min-height: 50vh;
  overflow-y: auto;
  }
  /deep/.list{
  height: 62.4vh;
  overflow-y: auto;
  }
  @media only screen
  and (max-height:736px)
  {
  /deep/ .list{
      height: 54vh;
      overflow-y: auto;
    }
}
  }
  // 供应商信息
  .supplierList {
    height: 68vh;
    overflow-y: auto;
    margin-top: 20px;
    padding-left: 20px;
    .supplier {
      width: 335px;
      height: 80px;
      margin-bottom: 12px;
      background: #ffffff;
      border: 1px solid #e9e9e9;
      border-radius: 8px;
      display: flex;
      font-size: 15px;
      line-height: 21px;
      font-family: PingFang Bold;
      color: #333333;
      .type {
        flex: 1;
        text-align: center;
        margin: auto;
      }
      .line {
        border: 1px solid #e9e9e9;
      }
      .inform {
        flex: 3;
        flex-direction: column;
        padding: 12px 0px 12px 10px;
        .time {
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
