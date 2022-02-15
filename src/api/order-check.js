import request from '@/utils/request'
// 品牌分配订单
export const brandAllotSupplier = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm2',
    data
  })
}
// 供应商确认或者重设订单
export const supplierAllot = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm3',
    data
  })
}
// 供应商签到
export const supplierSingIn = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm4',
    data
  })
}
// 供应商提交订单
export const supplierConfirmOrder = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm5',
    data
  })
}
// 店铺确认或者重设订单
export const assistantConfirmOrder = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm6',
    data
  })
}
// 品牌确认订单
export const brandConfirmOrder = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm7',
    data
  })
}
// 品牌审核不合格订单
export const brandConfirmBadOrder = data => {
  return request({
    method: 'POST',
    url: '/updateManageForm8',
    data
  })
}
// 经理审核增补
export const areaManagerConFirmSupplement = data => {
  return request({
    method: 'POST',
    url: '/supplement2',
    data
  })
}
// 品牌审核增补
export const brandConFirmSupplement = data => {
  return request({
    method: 'POST',
    url: '/supplement3',
    data
  })
}
