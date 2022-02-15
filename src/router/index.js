import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  // 跳转页
  {
    path: '/',
    redirect: store.state.user === null ? 'login' : 'home', // 如果没有用户信息，跳转到登录，否则跳转到主页。
    name: 'index',
    component: () => import('@/views/login')
  },

  // 注册页
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },

  // 首页路由
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/assistant/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/assistant/home')
      },
      {
        path: 'manage',
        name: 'management',
        component: () => import('@/views/assistant/manage')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/assistant/mine')
      }
    ]
  },

  // 店铺列表
  {
    path: '/storeList',
    name: 'storeList',
    component: () => import('@/views/assistant/storeList')
  },
  // 店铺详情
  {
    path: '/storeStatus',
    name: 'storeStatus',
    component: () => import('@/views/assistant/storeStatus')
  },
  // 新建订单
  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import('@/views/assistant/createOrder')
  },

  // 修改订单
  {
    path: '/resetOrder',
    name: 'resetOrder',
    component: () => import('@/views/assistant/resetOrder')
  },
  // 订单列表
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('@/views/assistant/orderList')
  },

  // 订单详情
  {
    path: '/orderStatus',
    name: 'orderStatus',
    component: () => import('@/views/assistant/orderStatus')
  },

  // 不合格订单详情
  {
    path: '/badOrderList',
    name: 'badOrderList',
    component: () => import('@/views/assistant/badOrderList')
  },

  // 用户中心
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import('@/views/assistant/userCenter')
  },
  // 修改密码
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('@/views/assistant/changePassword')
  },

  // 通讯录（品牌端特有）
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/brand/contact')
  },
  // 供应商详情（通讯录转接)
  {
    path: '/supplierStatus',
    name: 'supplierStatus',
    component: () => import('@/views/brand/supplierStatus')
  },
  {
    path: '/supplementList',
    name: 'supplementList',
    component: () => import('@/views/assistant/supplementList')
  },
  {
    path: '/createSupplement',
    name: 'createSupplement',
    component: () => import('@/views/assistant/createSupplement')
  },
  {
    path: '/supplementStatus',
    name: 'supplementStatus',
    component: () => import('@/views/assistant/supplementStatus')
  },
  {
    path: '/storeProps',
    name: 'storeProps',
    component: () => import('@/views/assistant/storeProps')
  }
]

const router = new VueRouter({
  routes
})
export default router
