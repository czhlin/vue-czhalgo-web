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
      component: () => import('@/components/Search/BinarySearch.vue'),
      name: 'BinarySearch',
      meta: { title: '折半查找', noCache: true, icon: 'search' }
    },
    {
      path: 'seqSearch',
      component: () => import('@/components/Search/OrderSearch.vue'),
      name: 'SeqSearch',
      meta: { title: '顺序查找', noCache: true, icon: 'search' }
    },
  ]
}

export default searchRouter