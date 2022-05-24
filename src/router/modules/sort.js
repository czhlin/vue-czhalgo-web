/*
 * @Date: 2022-02-19 16:36:23
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:08:13
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\sort.js
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const sortRouter = {
  path: '/sort',
  component: Layout,
  redirect: '/sort/bubbleSort',
  name: 'sort',
  meta: {
    title: '排序',
    icon: 'sort',
    src:'sort',
  },
  children: [
    {
      path: 'bubbleSort',
      component: () => import('@/views/sort/BubbleSort'),
      name: 'BubbleSort',
      meta: { title: '冒泡排序', noCache: true, icon: 'sort' }
    },
    {
      path: 'mergeSort',
      component: () => import('@/components/Sort/InsertSort.vue'),
      name: 'MergeSort',
      meta: { title: '插入排序', noCache: true, icon: 'sort' }
    },
    {
      path: 'quickSort',
      component: () => import('@/views/sort/QuickSort'),
      name: 'QuickSort',
      meta: { title: '快速排序', noCache: true, icon: 'sort' }
    }
  ]
}

export default sortRouter
