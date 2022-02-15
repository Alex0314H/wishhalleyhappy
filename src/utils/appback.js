import { Toast } from 'vant'
import store from '../store'
/**
 * 解决hbuilder打包app之后点击手机返回键直接退出app的问题
 */
document.addEventListener('plusready', function () {
  var webview = plus.webview.currentWebview()
  plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      if (store.state.previewPhoto === true) {
        store.commit('previewPhoto')
        return false
      }
      var first = null
      // 在我的和管理界面，返回首页
      var hash = location.hash.split('/')[2]
      if (hash === 'manage' || hash === 'mine' || hash === 'orderList') {
        location.hash = '#/home'
        if (!first) {
          first = new Date().getTime()
          Toast('再按一次退出应用')
          setTimeout(function () {
            first = null
          }, 1000)
        } else {
          if (new Date().getTime() - first < 1500) {
            plus.runtime.quit()
          }
        }
      } else if (hash === 'home') { plus.runtime.quit() } else { history.go(-1) }
    })
  })
})
