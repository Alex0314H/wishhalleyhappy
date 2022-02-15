import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'Flashfix__User'
export default new Vuex.Store({
  state: {
    // 一个对象，储存当前登录用户信息{token等数据}
    user: getItem(TOKEN_KEY),
    // 用户是否在搜索状态
    userStatus: '',
    // 店铺信息
    store: {},
    // 订单信息
    order: {},
    // 通讯录查询供应商负责订单所需要的供应商信息
    supplier: {},
    // 确保图片在预览状态下不会退出当前界面
    previewPhoto: false
  },
  mutations: {
    previewPhoto (state, status) {
      state.previewPhoto = !state.previewPhoto
    },
    setUserStatus (state, status) {
      state.userStatus = status
    },
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
    },
    // 点击店铺时展示的店铺信息
    setStore (state, store) {
      state.store = store
    },
    // 点击店铺时展示的店铺信息
    setOrder (state, order) {
      state.order = order
    },
    // 点击供应商时传递的供应商信息
    setSupplier (state, supplier) {
      state.supplier = supplier
    }
  },
  actions: {
  },
  modules: {
  }
})
