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
      path: 'changeSeqList',
      component: () => import('@/views/seq-list/ChangeSeqList'),
      name: 'ChangeSeqList',
      meta: { title: '顺序修改', noCache: true, icon: 'seq-list' }
    },
    {
      path: 'searchSeqList',
      component: () => import('@/views/seq-list/SearchSeqList'),
      name: 'SearchSeqList',
      meta: { title: '顺序搜索', noCache: true, icon: 'seq-list' }
    },
    {
      path: 'addSeqList',
      component: () => import('@/views/seq-list/AddSeqList'),
      name: 'AddSeqList',
      meta: { title: '顺序插入', noCache: true, icon: 'seq-list' }
    },
    {
      path: 'removeSeqList',
      component: () => import('@/views/seq-list/RemoveSeqList'),
      name: 'RemoveSeqList',
      meta: { title: '顺序删除', noCache: true, icon: 'seq-list' }
    },
  ]
}

export default seqListRouter