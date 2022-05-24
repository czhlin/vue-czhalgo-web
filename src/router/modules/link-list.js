/*
 * @Date: 2022-02-21 20:38:11
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:12:26
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\link-list.js
 */
import Layout from '@/layout'
/* 线性表 */
import SequInsert from '@/components/linearTable/sequentialTable/insert.vue'
import SequDelete from '@/components/linearTable/sequentialTable/delete.vue'
import SequMerge from '@/components/linearTable/sequentialTable/merge.vue'
import SequSearch from '@/components/linearTable/sequentialTable/search.vue'
import LinkInsert from '@/components/linearTable/linkedList/insert.vue'
import LinkDelete from '@/components/linearTable/linkedList/delete.vue'
import LinkMerge from '@/components/linearTable/linkedList/merge.vue'
import LinkSearch from '@/components/linearTable/linkedList/search.vue'
/* 栈和队列 */
import Stack from '@/components/StackAndQueue/Stack.vue'
import StackHand from '@/components/StackAndQueue/StackByHand.vue'
import Queue from '@/components/StackAndQueue/Queue.vue'
import QueueHand from '@/components/StackAndQueue/QueueByHand.vue'
/* 树和二叉树 */
import TreeBuild from '@/components/Tree/TreeBuild.vue'
import Proorder from '@/components/Tree/Proorder.vue'
import Inorder from '@/components/Tree/Inorder.vue'
import Postorder from '@/components/Tree/Postorder.vue'
/* 排序 */
import BubbleSort from '@/components/Sort/BubbleSort.vue'
import InsertSort from '@/components/Sort/InsertSort.vue'
import SelectSort from '@/components/Sort/SelectSort.vue'
import ShellSort from '@/components/Sort/ShellSort.vue'
/* 查找 */
import OrderSearch from '@/components/Search/OrderSearch.vue'
import BinarySearch from '@/components/Search/BinarySearch.vue'
import InsertSearch from '@/components/Search/InsertSearch.vue'
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
      path: 'buildLinkList',
      component: () => import('@/components/linearTable/linkedList/merge.vue'),
      name: 'BuildLinkList',
      meta: { title: '链表创建', noCache: true, icon: 'link-list' }
    },
    {
      path: 'searchLinkList',
      component: () => import('@/components/linearTable/linkedList/search.vue'),
      name: 'SearchLinkList',
      meta: { title: '链表搜索', noCache: true, icon: 'link-list' }
    },
    {
      path: 'insertLinkList',
      component: () => import('@/components/linearTable/linkedList/insert.vue'),
      name: 'InsertLinkList',
      meta: { title: '链表插入', noCache: true, icon: 'link-list' }
    },
    {
      path: 'removeLinkList',
      component: () => import('@/components/linearTable/linkedList/delete.vue'),
      name: 'RemoveLinkList',
      meta: { title: '链表删除', noCache: true, icon: 'link-list' }
    },
  ]
}

export default linkListRouter