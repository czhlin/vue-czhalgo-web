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
      component: () => import('@/components/Tree/TreeBuild.vue'),
      name: 'BuildTree',
      meta: { title: '树的创建', noCache: true, icon: 'tree' }
    },
    {
      path: 'preorderTraversal',
      component: () => import('@/components/Tree/Proorder.vue'),
      name: 'PreorderTraversal',
      meta: { title: '树的遍历', noCache: true, icon: 'tree' }
    }
  ]
}

export default treeRouter