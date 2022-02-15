<template>
<div class="userBar">
    <!-- 用户信息 -->
    <div class="user-info">
        <div class="left-img">
            <van-image
            round
            width="60px"
            height="60px"
            :src="userInfo.url"
            />
        </div>
        <div class="info">
            <div class="name">{{ userInfo.name }}</div>
            <div class="brand">
            所属品牌:{{ userInfo.brand }}
            <van-icon name="arrow" />
            </div>
        </div>
        <div class="line"></div>
    </div>
    <!-- 订单信息 -->
    <div class="user-order">
        <div class="onGoing" @click="$router.push({path:'orderList',query:{orderType:'onGoing'}})">
            <van-image :src="require('@/assets/pic/mine-user-ordering.svg')"/>
            <div>
            <div class="number">{{ userInfo.noform }}</div>
            <div class="text">进行中的订单</div>
            </div>
        </div>
        <div class="past" @click="$router.push({path:'orderList',query:{orderType:'past'}})">
            <van-image :src="require('@/assets/pic/mine-user-ordered.svg')"/>
            <div>
            <div class="number">{{ userInfo.yesform }}</div>
            <div class="text">历史完成订单</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
  name: 'userBar',
  components: {},
  props: ['userInfo'],
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
  }
}
</script>

<style scoped lang="less">
.userBar{
    position: relative;
    border-radius: 7px;
    height: 192px;
    width: 335px;
    background-color: #FFFFFF;
    margin-left: auto;
    margin-right: auto;
    .user-info{
        display: flex;
        height: 104px;
        width: 335px;
        .left-img{
            padding:20px 0px 0px 24px;
        }
        .info{
            height:59px;
            padding-left:12px;
            padding-top:20px;
            .name{
            font-family: PingFang Bold;
            padding-top:20px;
            font-size: 22px;
            line-height: 0px;
            color: rgba(51, 51, 51, 1);
            }
            .brand{
            padding-top: 28px;
            font-size: 15px;
            line-height: 0px;
            color: rgba(153, 153, 153, 1);
            font-family: PingFang Regular;
                .van-icon{
                    padding-left: 30px;
                }
            }
        }
        .line{
        height: 1px;
        width: 280px;
        background-color:#DDDDDD ;
        position: absolute;
        top: 104px;
        left: 24px;
        }
    }
    .user-order{
        display: flex;
        width: 335px;
        height: 88px;
        .onGoing{
        margin:auto;
            display: flex;
            .van-image{
            padding-right: 8px;
            }
            .number{
                font-family:'PingFang Bold';
                font-size:22px;
                color:rgba(51, 51, 51, 1);
                padding-bottom: 5px;
            }
            .text{
                font-family: 'PingFang Regular';
                font-size:12px;
                color: rgba(153, 153, 153, 1);
            }
        }
        .past{
            margin:auto;
            display: flex;
            .van-image{
                padding-right: 8px;
            }
            .number{
                font-family:'PingFang Bold';
                font-size:22px;
                color:rgba(51, 51, 51, 1);
                padding-bottom: 5px;
            }
            .text{
                font-family: 'PingFang Regular';
                font-size:12px;
                color: rgba(153, 153, 153, 1);
            }
        }
    }
}
</style>
