/*
 * @Date: 2022-02-21 21:28:27
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:11:10
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\seq-list.js
 */
import Layout from '@/layout'

const seqListRouter = {
  path: '/seq-list',
  redirect: '/seq-list/queue',
  component: Layout,
  name: 'seq-list',
  meta: {
    title: '顺序表',
    icon: 'eye-open'
  },
  children: [
    {
      path: 'eightQueens',
      component: () => import('@/views/seq-list/EightQueens'),
      name: 'EightQueens',
      meta: { title: '八皇后问题', noCache: true, icon: 'eye-open' }
    },
    {
      path: 'queue',
      component: () => import('@/views/seq-list/Queue'),
      name: 'Queue',
      meta: { title: '队列', noCache: true, icon: 'eye-open' }
    },
    {
      path: 'stack',
      component: () => import('@/views/seq-list/Stack'),
      name: 'Stack',
      meta: { title: '栈', noCache: true, icon: 'eye-open' }
    },
    {
      path: 'towerOfHanoi',
      component: () => import('@/views/seq-list/TowerOfHanoi'),
      name: 'TowerOfHanoi',
      meta: { title: '汉罗塔问题', noCache: true, icon: 'eye-open' }
    },
  ]
}

export default seqListRouter