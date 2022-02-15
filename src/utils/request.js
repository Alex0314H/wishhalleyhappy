/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// 拿到请求用户数据的请求头
import store from '@/store'

//  关于 refreshtoken新添加代码！
// import jsonBig from 'json-bigint'
import router from '@/router'

// axios.create 方法：复制一个 axios！
const request = axios.create({
  // baseURL: 'http://192.168.1.194:8087/'
  baseURL: 'https://www.kd5x.com/'
  // 基础路径
})

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题！
 */
// request.defaults.transformResponse = [
//   function (data) {
//     try {
//       return jsonBig.parse(data)
//     } catch (err) {
//       return {}
//     }
//   }
// ]

// 请求拦截器
// request原本应该是axios，这里是因为const request=axios 下文写作request
request.interceptors.request.use(function (config) {
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  // 请求发起经过下方
  const { user } = store.state
  // 如果用户有效并且拥有token，
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 要返回config 否则请求停在此处
  return config
}, function (error) {
  // 请求出错（没有发出去）进入这里
  return Promise.reject(error)
})

// 新增响应拦截器！
request.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  function (response) {
    return response
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function (error) {
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    console.dir(error)
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user
      if (!user || !user.tokenhead) {
        router.push('/')
        // 代码不要往后执行了
        return
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: '/login',
          headers: {
            Authorization: `${user.tokenhead}`
          }
        })

        // 如果获取成功，则把新的 token 更新到容器中
        console.log('刷新 token  成功', res)
        store.commit('setUser', {
          token: res.data.data.token, // 最新获取的可用 token
          tokenhead: user.tokenhead // 还是原来的 refresh_token
        })

        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷新 token 失败', err)
        router.push('/')
      }
    }

    return Promise.reject(error)
  }
)

export default request
