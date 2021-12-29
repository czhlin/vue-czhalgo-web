/*
 * @Date: 2021-11-29 14:59:43
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 14:25:50
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\animation\index.js
 */
import Sort from './sort'
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

  get $() {
    return this.data
  }

  set $(val) {
    this.data = val
  }

  init({ stage, setCursor, ...action }) {
    this.stage = stage
    this.setCursor = setCursor
    this.action = action
    if (this.created) {
      this.created()
    }
  }

  changeState(state) {
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
  Sort
}

