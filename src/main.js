// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
import 'iview/dist/styles/iview.css'
import './common/css/common.less'
import store from './vuex/store'
Vue.config.productionTip = false
Vue.use(iView)
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:7001'
Vue.prototype.commonUrl = 'http://localhost:7001'
// axios.defaults.baseURL = document.location.protocol + '//' + location.hostname
// Vue.prototype.commonUrl = document.location.protocol + '//' + location.hostname
Vue.prototype.$http = axios
/**
 *
 *  url : 接口
 *  data：发送的数据
 *  header 发送头
 */
Vue.prototype.$httpPost = function ({url, data = {}, header = {}}) {
  return axios.post(url, qs.stringify(data), header)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
