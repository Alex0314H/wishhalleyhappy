import request from '@/utils/request'
// 首页通知轮播
export const getNotification = params => {
  return request({
    method: 'GET',
    url: '/getUserInform',
    params
  })
}
// 管理的所有店铺
export const getStoreList = params => {
  return request({
    method: 'GET',
    url: '/getUserStore',
    params
  })
}
// 根据id查看单个订单状态
export const getOrder = data => {
  return request({
    method: 'POST',
    url: '/getUserForm',
    data
  })
}
// 查看所有进行中订单
export const getOnGoingOrder = params => {
  return request({
    method: 'GET',
    url: '/getUserFormNo',
    params
  })
}
// 查看所有已完成订单
export const getPastOrder = params => {
  return request({
    method: 'GET',
    url: '/getUserFormYes',
    params
  })
}

// 查看待处理的不合格维修单
export const getOngoingBadOrderList = params => {
  return request({
    method: 'GET',
    url: '/getFormNo',
    params
  })
}

// 查看待处理的不合格维修单
export const getPastBadOrderList = params => {
  return request({
    method: 'GET',
    url: '/getFormYes',
    params
  })
}
// 查看单个不合格维修单
export const getBadOrder = data => {
  return request({
    method: 'POST',
    url: '/getFormNo',
    data
  })
}

// 查看进行中的增补订单
export const getOngoingSupplement = data => {
  return request({
    method: 'GET',
    url: '/getSupplementNo',
    data
  })
}

// 查看已完成的增补订单
export const getPastSupplement = data => {
  return request({
    method: 'GET',
    url: '/getSupplementYes',
    data
  })
}

// 查看增补订单
export const getSupplement = data => {
  return request({
    method: 'POST',
    url: '/getSupplementPage',
    data
  })
}

// 查看店铺物品
export const getStoreProps = data => {
  return request({
    method: 'POST',
    url: '/storeGoodss',
    data
  })
}

// 退出登录
export const logOut = data => {
  return request({
    method: 'GET',
    url: '/logout',
    data
  })
}
