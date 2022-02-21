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
    icon: 'table'
  },
  children: [
    {
      path: 'bubbleSort',
      component: () => import('@/views/sort/BubbleSort'),
      name: 'BubbleSort',
      meta: { title: '冒泡排序', noCache: true, icon: 'table' }
    },
    {
      path: 'mergeSort',
      component: () => import('@/views/sort/MergeSort'),
      name: 'MergeSort',
      meta: { title: '归并排序', noCache: true, icon: 'table' }
    },
    {
      path: 'quickSort',
      component: () => import('@/views/sort/QuickSort'),
      name: 'QuickSort',
      meta: { title: '快速排序', noCache: true, icon: 'table' }
    },
    {
      path: 'shellSort',
      component: () => import('@/views/sort/ShellSort'),
      name: 'ShellSort',
      meta: { title: '希尔排序', noCache: true, icon: 'table' }
    }
  ]
}

export default sortRouter
