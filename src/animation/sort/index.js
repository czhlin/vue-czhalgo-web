/*
 * @Date: 2021-11-29 16:28:36
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-29 13:44:31
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\animation\sort\index.js
 */
import { fabric } from 'fabric'
import Item from './item'
import { Anima } from '@/animation/utils'
import { animation } from '@/utils/anim'
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
  EXCHANGE_ITEM([pre, last], op) {
    const preItem = this.ref.item(pre.index)
    const lastItem = this.ref.item(last.index)
    const p1 = animation(preItem)({
      left: lastItem.left,
      fill: setStatus(pre.status)
    }, op)
    const p2 = animation(lastItem)({
      left: preItem.left,
      fill: setStatus(last.status)
    }, op)
    const arr = this.ref._objects;
    [arr[pre.index], arr[last.index]] = [arr[last.index], arr[pre.index]]
    return Promise.all([p1, p2])
  },
  CHENGE_ITEM(arr, op) {
    const pArr = arr.map(({ index, status }) => (
      animation(this.ref.item(index))({
        fill: setStatus(status)
      }, op)
    ))
    return Promise.all(pArr)
  }
}
const action = {
  exchange(payload) {
    return {
      type: 'EXCHANGE_ITEM',
      payload
    }
  },
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
      const [maxVal, minVal] = getMaxAndMin(data)
      this.itemArr = data.map(
        (item, i) => (
          new Item({
            color: setStatus(item.status),
            text: item.value + '',
            width: 20,
            height: item.value * 100 / (maxVal - minVal),
            x: i * 30,
            y: 0
          })
        )
      )
      this.ref = new fabric.Group(this.itemArr.map(item => item.ref), option)
    }
}

export default Sort
