<template>
  <div class="allotEnginner" v-if="order.formstate==2&&this.$store.state.user.role==='supplier'">
    <div class="title">分配维修员</div>
    <div class="title">填写维修员信息</div>
    <van-form @submit="onSubmit">
      <van-field
        class="name"
        v-model="name"
        name="suppliername1"
        placeholder="维修员姓名"
      />
      <van-field
        class="phone"
        v-model="phone"
        name="supplierphone1"
        placeholder="联系电话"
      />
      <div class="title">预计到店时间</div>
      <van-field
        class="time"
        readonly
        clickable
        name="suppliertime"
        :value="date"
        placeholder="选择到店日期"
        @click="show = true"
        @click.once="firstChooseDate"
      />
      <div class="title">填写备注内容</div>
      <van-field
        class="supplierRemark"
        name="supplierremark"
        v-model="supplierRemark"
        placeholder="备注内容"
        type="textarea"
        maxlength="100"
        autosize
        show-word-limit
      />
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '50%' }"
        @click-overlay="confirmChange"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择到店日期"
          :min-date="minDate"
          :max-date="maxDate"
          @change="changeDate"
          @confirm="(show = false), confirmChange()"
          @cancel="(show = false), cancelChange()"
        />
      </van-popup>
      <div class="button">
        <van-button
          class="leftButton"
          block
          type="info"
          @click="rejest = 0"
          native-type="submit"
          >取消维修单</van-button
        >
        <van-button block type="info" @click="rejest = 1" native-type="submit"
          >确定分配</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { supplierAllot } from '@/api/order-check'
export default {
  name: 'allotEngineer',
  components: {},
  props: ['order'],
  data () {
    return {
      rejest: 1,
      name: '',
      phone: '',
      supplierRemark: '',
      minDate: new Date(),
      maxDate: new Date('2022/06/01'),
      currentDate: new Date(),
      show: false,
      date: '',
      bufferDate: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    cancelChange () {
      this.date = this.bufferDate
    },
    confirmChange () {
      this.bufferDate = this.date
    },
    firstChooseDate () {
      this.date = `${this.minDate.toLocaleDateString()}`.replace(/\//g, '-')
    },
    changeDate (e) {
      const endTimeArr = e.getValues()
      this.date = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}`
    },
    // 提交分配信息
    async onSubmit (values) {
      if (this.rejest === 0) {
        this.$dialog
          .confirm({
            title: '确认取消维修单吗?'
          })
          .then(async () => {
            try {
              const postdata = {
                id: this.$store.state.order.id,
                rejest: '0'
              }
              await supplierAllot(postdata)
              this.$router.go(-1)
              this.$toast.success('提交成功')
            } catch (err) {
              this.$toast('网络异常，请稍后再试!')
            }
          })
          .catch(() => {
            // on cancel
          })
      } else if (this.rejest === 1) {
        this.$dialog
          .confirm({
            title: '确认分配订单吗?'
          })
          .then(async () => {
            if (
              values.suppliername === '' ||
              values.suppliertime === '' ||
              values.supplierphone1 === ''
            ) {
              this.$toast('请确认订单信息填写完整!')
              return false
            }
            values.suppliertime = values.suppliertime.toString()
            values.id = `${this.$store.state.order.id}`
            values.rejest = '1'
            try {
              await supplierAllot(values)
              this.$router.go(-1)
              this.$toast.success('提交成功')
            } catch (err) {
              this.$toast('网络异常，请稍后再试!')
            }
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.allotEnginner{
  margin-top: 12px;
  padding-left: 20px;
  padding-top: 1px;
  width: 375px;
  background: #ffffff;
  .title {
    margin-top: 20px;
    margin-bottom: 8px;
    font-family: PingFang Bold;
    color: #000000;
    font-size: 13px;
    line-height: 18px;
  }
  .van-cell::after {
    display: none;
  }
  /deep/.van-field__control {
    margin-left: -5px;
    font-size: 15px;
    font-family: PingFang regular;
  }
  .van-cell {
    border: 1px solid #dddddd;
    border-radius: 4px;
  }
  .name {
    display: inline-block;
    width: 109px;
  }
  .phone {
    margin-left: 8px;
    display: inline-block;
    width: 218px;
  }
  .time {
    width: 335px;
  }
  .supplierRemark {
    width: 335px;
  }
  .button {
    width: 350px;
    .leftButton {
      margin-right: 20px;
    }
    .van-button {
      display: inline-block;
      margin-top: 16px;
      border: none;
      width: 157px;
      height: 40px;
      background: #000000;
      border-radius: 6px;
      font-size: 13px;
      font-family: PingFang Bold;
      color: #ffffff;
    }
  }
}
</style>
