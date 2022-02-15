<template>
  <div class="assistant-login-code-container">
    <!-- 欢迎logo -->
    <div class="top">
      <div>欢迎来到</div>
      <van-image :src="require('@/assets/pic/logo.png')"
        width="3.6266666rem"
        height="0.96rem"
        fit="cover"
        class="custom-image"
      />
      <div class="register" v-show="code">
        用手机验证码登录
      </div>
      <div class="register" v-show="!code">
        用账号密码登录
      </div>
    </div>

<van-form ref="loginForm" @submit="onSubmit" v-show="code">
  <van-field
    v-model="user.phone"
    name="phone"
    label="手机号"
    placeholder="请输入手机号"
    type="number"
    maxlength="11"
  />
  <van-field
    v-model="user.code"
    name="code"
    placeholder="请输入验证码"
    type="number"
    maxlength="6"
  >
   <template #button>
    <van-count-down
    v-if="isCountDownShow"
    :time="1000* 30"
    format="ss s"
    @finish="isCountDownShow = false"
    />
    <van-button
    v-else
    native-type="button"
    round size="small"
    type="default"
    @click="ongetCode">
    获取验证码</van-button>
  </template>
  </van-field>
  <div class="login">
    <van-button  color="#333333" block  type="info" native-type="submit">
      登录</van-button>
  </div>
</van-form>

<password v-show="!code"/>
<div class="change" @click="changeWay" v-show="code">用账号密码登录</div>
<div class="change" @click="changeWay" v-show="!code">用手机验证码登录</div>
  </div>
</template>

<script>
import { login, getCode } from '@/api/login'
import password from './components/password.vue'
export default {
  name: 'assistant-LoginIndex-code',
  components: {
    password
  },
  props: {},
  data () {
    return {
      code: true,
      user: {
        phone: '',
        code: ''
      },
      isCountDownShow: false// 是否展示倒计时
    }
  },
  created () {
  },
  methods: {
    changeWay () {
      this.code = !this.code
    },
    async onSubmit () {
      // 1.展示登陆中loading
      // 在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间
      })

      // 2.请求登录
      try {
        const { data } = await login(this.user)
        console.log(data)
        if (data.code === 200) {
          this.$toast.success(data.message)
          // 登陆成功 跳转回原来的界面
          if (data.data.role === '4') {
            data.data.role = 'brand'
          } else if (data.data.role === '5') {
            data.data.role = 'assistant'
          } else if (data.data.role === '6') {
            data.data.role = 'supplier'
          } else if (data.data.role === '8') {
            data.data.role = 'areaManager'
          }
          data.data.phone = this.user.phone
          this.$router.push('home')
          this.$store.commit('setUser', data.data)
          console.log(this.$store.state.user.role)
        } else {
          this.$toast.fail(data.message)
        }
      } catch (err) {
        this.$toast.fail('登陆失败，请稍后重试')
      }
    },
    async ongetCode () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('phone')
      } catch (err) {
        return this.$toast.fail('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      const { data } = await getCode(this.user.phone)
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
.assistant-login-code-container{
  background: rgba(255, 255, 255, 1);
  height: 812px;
  .top{
    padding-top: 83px;
    padding-left: 20px;
    div:first-child {
      width: 90px;
      height: 25px;
      font-size: 18px;
      font-weight: 400;
      color: #666666;
      opacity: 0.66;
      margin-bottom: 8px;
    }
    .register{
      margin-top: 36px;
      width: 98px;
      height: 17px;
      font-size: 12px;
      font-weight: bold;
      line-height: 0px;
      color: #666666;
      opacity: 1;
    }
  }
  .van-cell::after{
    border-bottom:2px solid rgba(187, 187, 187, 1)
  }
  .van-field{
    background: transparent;
  }
  // 登录按钮
  .login{
    width: 335px;
    margin: 79px 20px 20px ;
  }
  //切换按钮
  .change{
    margin: auto;
    margin-top: 50px;
    width: 140px;
    height: 18px;
    font-size: 15px;
    color: #000000;
    text-align: center;
    .router-link-active {
    color: black;
}
  }
}
</style>
