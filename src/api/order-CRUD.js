import request from '@/utils/request'
// 增加订单
export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/insertUserForm',
    data
  })
}
// 增加订单
export const createSupplement = data => {
  return request({
    method: 'POST',
    url: '/insertSupplement',
    data
  })
}
// 查看店铺报修类型是否过期
export const warrantyCheck = data => {
  return request({
    method: 'POST',
    url: '/propPastDue',
    data
  })
}
// 上传图片
export const upload = data => {
  return request({
    method: 'POST',
    url: '/urlupload',
    data
  })
}
// 删除订单 *
export const deleteOrder = data => {
  return request({
    method: 'POST',
    url: '/deleteUserForm',
    data
  })
}
// 修改订单
export const resetOrder = data => {
  return request({
    method: 'POST',
    url: '/updateUserForm',
    data
  })
}
// 根据单号/类型搜索订单
export const searchOrder = data => {
  return request({
    method: 'POST',
    url: '/getUserFormSearch',
    data
  })
}
