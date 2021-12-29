/*
 * @Date: 2021-11-04 20:12:28
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 12:51:01
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\store\modules\permission.js
 */
import { asyncRoutes, constantRoutes } from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// 描述：使用roles:Array<string>和route:{path,component,meta:{roles:[]}}},判断当前用户能不能访问当前路由规则。返回布尔值。
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 如果路由规则上有meta,并且meta上有roles这个自定义字段，说明这条路由是有权限的，要进行过滤权限。
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 如果路由规则上没有meta这个属性，或者meta上没有roles这个自定义字段，任何用户都可以访问。
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 描述：使用roles:Array<string>,和routes:Array<route>生成当前用户可访问的路由规则
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    // 深复制(深拷贝)仅对那些比较简单对象进行深拷贝
    const tmp = { ...route }
    // hasPermission(['admin','editor'],{path,component,meta:{}}):boolean
    if (hasPermission(roles, tmp)) {
      // 有没有嵌套视图，如果有进行递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 静态路由规则
  addRoutes: []// 只是当前用户可访问的动态路由规则
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 用于生成当前用户可访问的路由规则
  // roles=['admin','editor']
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      try {
        if (roles.includes('admin')) {
          // admin用户
          // 工作经验：工作中的管理系统，admin一般只用看功能性页面，不需要看那些业务性页面
          // accessedRoutes = asyncRoutes || []
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        } else {
          // 非admin用户
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        // 把当前用户可访问的路由规则放在vuex中
        commit('SET_ROUTES', accessedRoutes)
        // 把当用户可访问的路由规则给到.then上
        resolve(accessedRoutes)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  noPermission({ commit }) {
    commit('SET_ROUTES', asyncRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
