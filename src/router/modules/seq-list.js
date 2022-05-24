/*
 * @Date: 2022-02-21 21:28:27
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:11:10
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\seq-list.js
 */
import Layout from '@/layout'

const seqListRouter = {
  path: '/seq-list',
  redirect: '/seq-list/searchSeqList',
  component: Layout,
  name: 'seq-list',
  meta: {
    title: '顺序表',
    icon: 'seq-list',
    src:'seqList',
  },
  children: [
    {
      path: 'mergeSeqList',
      component: () => import('@/components/linearTable/sequentialTable/merge.vue'),
      name: 'MergeSeqList',
      meta: { title: '顺序合并', noCache: true, icon: 'seq-list' }
    },
    {
      path: 'searchSeqList',
      component: () => import('@/components/linearTable/sequentialTable/search.vue'),
      name: 'SearchSeqList',
      meta: { title: '顺序搜索', noCache: true, icon: 'seq-list' }
    },
    {
      path: 'addSeqList',
      component: () => import('@/components/linearTable/sequentialTable/insert.vue'),
      name: 'AddSeqList',
      meta: { title: '顺序插入', noCache: true, icon: 'seq-list' }
    },
    {
      path: 'removeSeqList',
      component: () => import('@/components/linearTable/sequentialTable/delete.vue'),
      name: 'RemoveSeqList',
      meta: { title: '顺序删除', noCache: true, icon: 'seq-list' }
    },
  ]
}

export default seqListRouter