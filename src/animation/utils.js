/*
 * @Date: 2021-12-27 19:07:09
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-29 13:41:23
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\animation\utils.js
 */
export class Anima {
    mutations={}
    init() {
      throw new Error('missing init method')
    }

    doAnim({ type, payload }) {
      const fn = (op = {}) => this.mutations[type].call(this, payload, op)
      fn.then = (cb) => fn().then(cb)
      return fn
    }
}
