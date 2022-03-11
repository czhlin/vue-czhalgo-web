/*
 * @Date: 2021-11-04 20:33:57
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:04:33
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\constantRoutes.js
 */
import Layout from '@/layout'
export default [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Home.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  { path: '/dashboard',  redirect: '/home' },
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]
