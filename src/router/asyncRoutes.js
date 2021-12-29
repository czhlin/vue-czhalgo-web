/*
 * @Date: 2021-11-04 20:28:07
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 10:19:38
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\router\asyncRoutes.js
 */
import sortRouter from './modules/sort'
export default [
  sortRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
