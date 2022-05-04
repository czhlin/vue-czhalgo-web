/*
 * @Date: 2022-02-21 21:27:47
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 23:11:48
 * @FilePath: \graduation-project\vue-czhalgo-web\src\router\modules\search.js
 */
import Layout from '@/layout'

const searchRouter = {
  path: '/search',
  redirect: '/search/binarySearch',
  component: Layout,
  name: 'search',
  meta: {
    title: '查找算法',
    icon: 'search',
    src:'search',
  },
  children: [
    {
      path: 'binarySearch',
      component: () => import('@/views/search/BinarySearch'),
      name: 'BinarySearch',
      meta: { title: '折半查找', noCache: true, icon: 'search' }
    },
    {
      path: 'blockSearch',
      component: () => import('@/views/search/BlockSearch'),
      name: 'BlockSearch',
      meta: { title: '分块查找', noCache: true, icon: 'search' }
    },
    {
      path: 'hashSearch',
      component: () => import('@/views/search/HashSearch'),
      name: 'HashSearch',
      meta: { title: '哈希查找', noCache: true, icon: 'search' }
    },
    {
      path: 'seqSearch',
      component: () => import('@/views/search/SeqSearch'),
      name: 'SeqSearch',
      meta: { title: '顺序查找', noCache: true, icon: 'search' }
    },
  ]
}

export default searchRouter