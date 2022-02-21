/*
 * @Date: 2022-02-21 21:27:59
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:10:27
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\tree.js
 */
import Layout from '@/layout'

const treeRouter = {
  path: '/tree',
  redirect: '/tree/traversalTree',
  component: Layout,
  name: 'tree',
  meta: {
    title: '树',
    icon: 'eye-open'
  },
  children: [
    {
      path: 'huffmanTree',
      component: () => import('@/views/tree/HuffmanTree'),
      name: 'HuffmanTree',
      meta: { title: '霍夫曼树', noCache: true, icon: 'eye-open' }
    },
    {
      path: 'priorityQueue',
      component: () => import('@/views/tree/PriorityQueue'),
      name: 'PriorityQueue',
      meta: { title: '优先队列', noCache: true, icon: 'eye-open' }
    },
    {
      path: 'saveTree',
      component: () => import('@/views/tree/SaveTree'),
      name: 'SaveTree',
      meta: { title: '树的存储', noCache: true, icon: 'eye-open' }
    },
    {
      path: 'traversalTree',
      component: () => import('@/views/tree/TraversalTree'),
      name: 'TraversalTree',
      meta: { title: '树的遍历', noCache: true, icon: 'eye-open' }
    },
  ]
}

export default treeRouter