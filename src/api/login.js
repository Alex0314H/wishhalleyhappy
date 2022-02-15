import request from '@/utils/request'
// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

// 发送手机号获取验证码
export const getCode = phone => {
  return request({
    method: 'GET',
    url: `/captcha?phone=${phone}`,
    phone
  })
}

// 修改密码时获取验证码
export const getPasswordCode = phone => {
  return request({
    method: 'GET',
    url: `/captchaPassword?phone=${phone}`,
    phone
  })
}

// 修改密码
export const changePassword = data => {
  return request({
    method: 'POST',
    url: '/upPassword',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/getUser'
  })
}
