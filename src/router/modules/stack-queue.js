import Layout from '@/layout'

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
      path: 'queue',
      component: () => import('@/views/stack-queue/Queue'),
      name: 'Queue',
      meta: { title: '队列', noCache: true, icon: 'stack-queue' }
    },
    {
      path: 'stack',
      component: () => import('@/views/stack-queue/Stack'),
      name: 'Stack',
      meta: { title: '栈', noCache: true, icon: 'stack-queue' }
    }
  ]
}

export default stackQueueRouter