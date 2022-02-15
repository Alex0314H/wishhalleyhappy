<template>
  <div class="assistant-login-password-container">
    <!-- 登录表单 -->
<van-form ref="loginForm" @submit="onSubmit">
  <van-field
    v-model="user.phone"
    name="phone"
    placeholder="请输入手机号"
    type="number"
    maxlength="11"
  />
  <div class="password">
    <van-field
      v-model="user.password"
      name="password"
      placeholder="请输入密码"
      type="number"
    >
    </van-field>
    <div class="border"></div>
  </div>
  <div class="login">
    <van-button  color="#333333" block type="info" native-type="submit">
      登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login } from '@/api/login'

export default {
  name: 'assistant-LoginIndex-password',
  components: {},
  props: {},
  data () {
    return {
      user: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间
      })

      // 2.请求登录
      try {
        const { data } = await login(this.user)
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
        } else {
          this.$toast.fail('网络失败请重试!')
        }
      } catch (err) {
        this.$toast.fail('登陆失败，请稍后重试')
      }
    }

  }
}
</script>

<style scoped lang="less">
.assistant-login-password-container{
  .password{
   /deep/ .van-field__body{
            height: 33px;
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
}
</style>
