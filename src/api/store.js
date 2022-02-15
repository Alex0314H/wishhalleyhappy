
import request from '@/utils/request'

// 店铺保修期数据
export const getStoreWarranty = data => {
  return request({
    method: 'POST',
    url: '/getStores',
    data
  })
}

// 店铺的历史订单
export const getStorePastOrder = data => {
  return request({
    method: 'POST',
    url: '/selectFormOneYes',
    data
  })
}
// 店铺的进行中订单
export const getStoreOngoingOrder = data => {
  return request({
    method: 'POST',
    url: '/selectFormOneNo',
    data
  })
}
