/*
 * @Date: 2022-02-21 20:38:11
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:12:26
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\link-list.js
 */
import Layout from '@/layout'

const linkListRouter = {
  path: '/link-list',
  redirect: '/link-list/searchLinkList',
  component: Layout,
  name: 'link-list',
  meta: {
    title: '链表',
    icon: 'link-list',
    src:'linkList',
  },
  children: [
    {
      path: 'ChangeLinkList',
      component: () => import('@/views/link-list/ChangeLinkList'),
      name: 'ChangeLinkList',
      meta: { title: '链表修改', noCache: true, icon: 'link-list' }
    },
    {
      path: 'searchLinkList',
      component: () => import('@/views/link-list/SearchLinkList'),
      name: 'SearchLinkList',
      meta: { title: '链表搜索', noCache: true, icon: 'link-list' }
    },
    {
      path: 'insertLinkList',
      component: () => import('@/views/link-list/InsertLinkList'),
      name: 'InsertLinkList',
      meta: { title: '链表插入', noCache: true, icon: 'link-list' }
    },
    {
      path: 'removeLinkList',
      component: () => import('@/views/link-list/RemoveLinkList'),
      name: 'RemoveLinkList',
      meta: { title: '链表删除', noCache: true, icon: 'link-list' }
    },
  ]
}

export default linkListRouter