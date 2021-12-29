import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from './constantRoutes'
import asyncRoutes from './asyncRoutes'
Vue.use(VueRouter)
const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export {
  constantRoutes,
  asyncRoutes,
  resetRouter
}
export default router
