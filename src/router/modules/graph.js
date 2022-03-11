/*
 * @Date: 2022-02-21 21:27:32
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:12:54
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\graph.js
 */
import Layout from '@/layout'

const GraphRouter = {
  path: '/graph',
  redirect: '/graph/dijkstra',
  component: Layout,
  name: 'graph',
  meta: {
    title: '图',
    icon: 'graph'
  },
  children: [
    {
      path: 'dijkstra',
      component: () => import('@/views/graph/Dijkstra'),
      name: 'Dijkstra',
      meta: { title: '迪杰斯特拉算法', noCache: true, icon: 'graph' }
    },
    {
      path: 'prim',
      component: () => import('@/views/graph/Prim'),
      name: 'Prim',
      meta: { title: '普里姆算法', noCache: true, icon: 'graph' }
    },
    {
      path: 'topologicalSort',
      component: () => import('@/views/graph/TopologicalSort'),
      name: 'TopologicalSort',
      meta: { title: '拓扑排序', noCache: true, icon: 'graph' }
    },
    {
      path: 'traversalGraph',
      component: () => import('@/views/graph/TraversalGraph'),
      name: 'TraversalGraph',
      meta: { title: '图的遍历', noCache: true, icon: 'graph' }
    },
  ]
}

export default GraphRouter