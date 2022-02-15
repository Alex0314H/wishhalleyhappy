<template>
  <div class="changePassword-container">
    <!-- 头部 -->
    <headBar ref="headBar" back="home" />
    <van-form @submit="onSubmit">
    <van-field class="firstField" center name="phone" label="账号"  :value="$store.state.user.phone" readonly />
  <van-field
  class="secondField"
    v-model="captcha"
    required
    center
    name="captcha"
    label="验证码"
    placeholder="请输入验证码"
    type="number"
    maxlength="6"
  >
   <template #right-icon>
      <van-count-down
      v-if="isCountDownShow"
      :time="1000* 30"
      format="ss s"
      @finish="isCountDownShow = false"
      />
      <van-button
      v-else
      class="getCode"
      native-type="button"
      size="small"
      type="default"
      color="#F1F1F1"
      @click="ongetCode">
      获取验证码
      </van-button>
  </template>
  </van-field>
  <van-field
    required
    center
    v-model="newPassword"
    name="newPassword"
    label="新密码"
    placeholder="请输入新密码"
  />
    <van-field
    center
    v-model="checkPassword"
    required
    name="checkPassword"
    label="新密码"
    placeholder="请确认新密码"
  />
  <div class="login">
    <van-button color="#000000" block  type="info" native-type="submit">提交</van-button>
  </div>
</van-form>

  </div>
</template>

<script>
import { changePassword, getPasswordCode } from '@/api/login'
import headBar from './components/headBar.vue'
export default {
  name: 'changePassword',
  components: {
    headBar
  },
  props: {},
  data () {
    return {
      captcha: '',
      newPassword: '',
      checkPassword: '',
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onSubmit (values) {
      if (values.captcha.length !== 6) {
        this.$toast.fail('请输入六位数验证码')
        return false
      }
      if (values.checkPassword !== values.newPassword) {
        this.$toast.fail('两次密码输入不一致')
        return false
      }
      if (values.checkPassword.length < 6) {
        this.$toast.fail('密码至少为六位数字!')
        return false
      }
      this.$toast.loading({
        message: '验证中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间
      })
      try {
        const postdata = this.$qs.stringify({
          phone: values.phone,
          captcha: values.captcha,
          password: values.checkPassword
        })
        await changePassword(postdata)
        this.$toast.success('修改密码成功')
        this.$router.push('mine')
      } catch (err) {
        this.$toast.fail('修改密码请稍后重试')
      }
    },

    async ongetCode () {
      this.isCountDownShow = true
      // 3.请求发送验证码
      const { data } = await getPasswordCode(this.$store.state.user.phone)
      if (data.code === 200) {
        this.$toast.success(data.message)
      } else {
        this.$toast.fail(data.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.changePassword-container{
  background-color: #F1F1F1;
  .van-field{
    width: 350px;
    margin-left: 10px;
    background: transparent;
  }
 /deep/ .van-field__label {
    width: 44px;
    // text-align: center;
    margin-left: 0px;
    // padding-top: 5px;
}
 /deep/ .van-field__control{
   padding-left: 10px;
   width: 273px;
   height: 34px;
   background-color: #FFFFFF;
   border: solid 1px #DDDDDD;
   border-radius: 4px;
  }
  .getCode {
    .van-button::before{
    color: #999999;
    }

  }
 .firstField{
    margin-top: 20px;
    background-color: transparent;
    /deep/ .van-field__control{
      background-color: transparent;
    }
  }
  .secondField{
    /deep/.van-field__value{
      .van-field__body{
        width: 273px;
        border: solid 1px #DDDDDD;
        border-radius: 4px;
        .van-field__control{
          border: none;
        }
        .van-count-down{
        margin-left: -30px;
        margin-right: 30px;
          width: 78px;
        }
        .van-button__text{
          color:#999999;
        }
      }
    }
  }
  .login{
    button{
      border-radius: 4px;
      width: 335px;
      margin: 60px 20px 20px ;
    }
  }
}
</style>
