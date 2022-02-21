/*
 * @Date: 2021-11-29 16:28:36
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-20 21:35:31
 * @FilePath: \graduation-project\vue-czhalgo-web\src\animation\sort\index.js
 */
import { fabric } from 'fabric'
import Item from './item'
import { Anima } from '@/animation/utils'//定义动画类
import { animation } from '@/utils/anim'//使用fabric动画，封装成promise形式
import { getMaxAndMin } from '@/utils/math'
// 私有方法
const setStatus = (status) => {
  let color = ''
  switch (status) {
    case -1:
      color = 'red'
      break
    case 0:
      color = '#ccc'
      break
    case 1:
      color = 'yellow'
      break
    default:
      color = 'green'
      break
  }
  return color
}
// 动画修改
const mutations = {
  //排序条交换动画
  EXCHANGE_ITEM([pre, last], op) {
    //获取需要交换的item对象
    const preItem = this.ref.item(pre.index)
    const lastItem = this.ref.item(last.index)
    //开始交换动画
    const p1 = animation(preItem)({
      left: lastItem.left,
      fill: setStatus(pre.status)
    }, op)
    const p2 = animation(lastItem)({
      left: preItem.left,
      fill: setStatus(last.status)
    }, op)
    //数据层面的交换
    const arr = this.ref._objects;
    [arr[pre.index], arr[last.index]] = [arr[last.index], arr[pre.index]]
    //返回动画完成的promise
    return Promise.all([p1, p2])
  },
  //排序条改变动画
  CHENGE_ITEM(arr, op) {
    const pArr = arr.map(({ index, status }) => (
      //开始排序条颜色改变动画
      animation(this.ref.item(index))({
        fill: setStatus(status)
      }, op)
    ))
    //返回动画完成的promise
    return Promise.all(pArr)
  }
}
const action = {
  //排序交换行为
  exchange(payload) {
    return {
      type: 'EXCHANGE_ITEM',
      payload
    }
  },
  //排序条改变行为
  change(payload) {
    return {
      type: 'CHENGE_ITEM',
      payload
    }
  }
}
class Sort extends Anima {
    // 修改数据
    mutations=mutations
    // 行为
    static action=action
    constructor(data, option) {
      super()
      this.option = option
      this.init(data)
    }

    init(data = [], option = this.option) {
      const [maxVal, minVal] = getMaxAndMin(data)//获取数组中最大值和最小值
      this.itemArr = data.map(//将数字数组映射成Item数组
        (item, i) => (
          new Item({
            color: setStatus(item.status),
            text: item.value + '',
            width: 20,
            height: (item.value - minVal + 10) / (maxVal - minVal) * 100,
            x: i * 30,
            y: 0
          })
        )
      )
      //将组合fabric对象挂载到ref上
      this.ref = new fabric.Group(this.itemArr.map(item => item.ref), option)
    }
}

export default Sort
