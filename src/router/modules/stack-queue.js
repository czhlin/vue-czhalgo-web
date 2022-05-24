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
const stackQueueRouter = {
  path: '/stack-queue',
  component: Layout,
  redirect: '/stack-queue/stack',
  name: 'stack-queue',
  meta: {
    title: '栈和队列',
    icon: 'stack-queue',
    src:'stackQueue',
  },
  children: [
    {
      path: 'handQueue',
      component: () => import('@/components/StackAndQueue/QueueByHand.vue'),
      name: 'HandQueue',
      meta: { title: '手动队列', noCache: true, icon: 'stack-queue' }
    },
    {
      path: 'handStack',
      component: () => import('@/components/StackAndQueue/StackByHand.vue'),
      name: 'HandStack',
      meta: { title: '手动栈', noCache: true, icon: 'stack-queue' }
    },
    {
      path: 'queue',
      component: () => import('@/components/StackAndQueue/Queue.vue'),
      name: 'Queue',
      meta: { title: '自动队列', noCache: true, icon: 'stack-queue' }
    },
    {
      path: 'stack',
      component: () => import('@/components/StackAndQueue/Stack.vue'),
      name: 'Stack',
      meta: { title: '自动栈', noCache: true, icon: 'stack-queue' }
    }
  ]
}

export default stackQueueRouter