import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../vuex/store'
Vue.use(Router)
const routeInfo = new Router({
  routes
})
let MenuList = []
routes.forEach(item => {
  if (!item.meta.hideMenuFlag) {
    MenuList.push(item)
  }
})
store.state.MenuList = MenuList
routeInfo.beforeEach((to, from, next) => {
  let BreadcrumbFlag = !to.meta.thirdMenusList
  store.state.PageHeaderInfo = { // 页面头部显示内容信息
    BreadcrumbList: to.meta.breadcrumbList || [], // 面包屑数据
    BreadcrumbFlag, // 是否显示面包屑
    ThirdMenusList: to.meta.thirdMenusList || [] // 三级导航数据
  }
  if (!BreadcrumbFlag) {
    store.state.CurrentThirdItemName = to.name
  }
  next()
})
export default routeInfo
