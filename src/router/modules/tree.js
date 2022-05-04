/*
 * @Date: 2022-02-21 21:27:59
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:10:27
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\tree.js
 */
import Layout from '@/layout'

const treeRouter = {
  path: '/tree',
  redirect: '/tree/buildTree',
  component: Layout,
  name: 'tree',
  meta: {
    title: '二叉树',
    icon: 'tree',
    src:'tree',
  },
  children: [
    {
      path: 'buildTree',
      component: () => import('@/views/tree/BuildTree'),
      name: 'BuildTree',
      meta: { title: '树的创建', noCache: true, icon: 'tree' }
    },
    {
      path: 'inorderTraversal',
      component: () => import('@/views/tree/InorderTraversal'),
      name: 'InorderTraversal',
      meta: { title: '中序遍历', noCache: true, icon: 'tree' }
    },
    {
      path: 'postOrderTraversa',
      component: () => import('@/views/tree/PostOrderTraversa'),
      name: 'PostOrderTraversa',
      meta: { title: '后序遍历', noCache: true, icon: 'tree' }
    },
    {
      path: 'preorderTraversal',
      component: () => import('@/views/tree/PreorderTraversal'),
      name: 'PreorderTraversal',
      meta: { title: '前序遍历', noCache: true, icon: 'tree' }
    },
  ]
}

export default treeRouter