import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../vuex/store'
Vue.use(Router)
const routeInfo = new Router({
  routes
})
routeInfo.beforeEach((to, from, next) => {
  console.log(to, 'to')
  console.log(from, 'from')
  store.state.PageHeaderInfo = { // 页面头部显示内容信息
    BreadcrumbList: to.meta.breadcrumbList || [], // 面包屑数据
    BreadcrumbFlag: !to.meta.thirdMenusList, // 是否显示面包屑
    ThirdMenusList: to.meta.thirdMenusList || [] // 三级导航数据
  }
  next()
})
export default routeInfo
