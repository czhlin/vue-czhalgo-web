/*
 * @Date: 2021-11-04 20:28:07
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 22:01:08
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\asyncRoutes.js
 */
import sortRouter from './modules/sort'
import linkListRouter from './modules/link-list'
import graphRouter from './modules/graph'
import searchRouter from './modules/search'
import seqListRouter from './modules/seq-list'
import treeRouter from './modules/tree'
import stackQueueRouter from './modules/stack-queue'
export default [
  linkListRouter,
  seqListRouter,
  stackQueueRouter,
  treeRouter,
  sortRouter,
  graphRouter,
  searchRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
