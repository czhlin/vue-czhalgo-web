/*
 * @Date: 2021-11-29 14:59:43
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 13:29:14
 * @FilePath: \graduation-project\vue-czhalgo-web\src\animation\index.js
 */
import Sort from './sort'
import LinkList from './link-list'
import {deepClone} from '@/utils'
class Animation {
  /**
   *
   * @param {*} stage 舞台用来调用fabric.Canvas的api
   * @param setCursor 控制代码光标
   * @param action 调用动画相关的action
   * @param state 调用layout中AppContainer中的api
   * @param comp 调用组件实例中的api
   */
  // 一般用于组件实例的引用
  static REF=null
  // 用于实例调用组件实例
  // eslint-disable-next-line no-use-before-define
  comp=Ref.REF
  // 将ref设置到Animation上
  static setRef(ref) {
    Ref.REF = ref
  }
  data={}
  //用于存放数据
  get $() {
    return this.data
  }

  set $(val) {
    this.data = val
  }
  init({ stage, anim, setCursor,data, ...action }) {
    this.stage = stage
    this.setCursor = setCursor
    this.action = action
    this.anim = anim
    this.data={...this.data,...deepClone(data)}
    Object.entries(Ref)
    if (this.created) {
      this.created()
    }
  }

  changeState(state) {
    console.log(state,50);
    this.state = state
  }

  doAnim() {
    throw new Error('missing doAnim method')
  }

  doCode() {
    throw new Error('missing doCode method')
  }
}
const Ref = Animation
export default Animation
export {
  Sort,
  LinkList
}

