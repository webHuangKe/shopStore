import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
Vue.use(Router)
const routeInfo = new Router({
  routes
})
routeInfo.beforeEach((to, from, next) => {
  console.log(to, 'to')
  console.log(from, 'from')
  next()
})
export default routeInfo
