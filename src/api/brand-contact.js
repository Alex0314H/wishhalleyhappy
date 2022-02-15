import request from '@/utils/request'
// 查询

// 通讯录
// 品牌查看店长列表
export const contactGetAssistant = params => {
  return request({
    method: 'GET',
    url: '/getBookStores',
    params
  })
}
// 品牌查看供应商列表
export const contactGetSupplier = params => {
  return request({
    method: 'GET',
    url: '/getBookSupplier',
    params
  })
}
// 品牌查询供应商进行中的订单
export const GetSupplierOnGoingOrder = data => {
  return request({
    method: 'POST',
    url: '/getBookSupplierFormNo',
    data
  })
}
// 品牌查看供应商已完成的订单
export const GetSupplierPastOrder = data => {
  return request({
    method: 'POST',
    url: '/getBookSupplierFormYes',
    data
  })
}
