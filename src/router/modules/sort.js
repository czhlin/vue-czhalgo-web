/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const sortRouter = {
  path: '/sort',
  component: Layout,
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
      path: 'insertSort',
      component: () => import('@/views/sort/InsertSort.vue'),
      name: 'InsertSort',
      meta: { title: '插入排序', noCache: true, icon: 'table' }
    }
  ]
}

export default sortRouter
