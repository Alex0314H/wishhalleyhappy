import 'amfe-flexible'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/reset.less'
import './styles/index.less'
import './styles/font.css'
import qs from 'qs'
import './utils/appback.js'

Vue.prototype.$qs = qs
Vue.use(Vant)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
