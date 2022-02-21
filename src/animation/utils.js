/*
 * @Date: 2021-12-27 19:07:09
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 00:45:06
 * @FilePath: \graduation-project\vue-czhalgo-web\src\animation\utils.js
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
/**
 *class Foo extends Anima {
      // 动画触发
      mutations=mutations
      // 行为
      static action=action
      constructor(data, option) {
        super()
        this.option = option
        this.init(data)
      }

      init(data = [], option = this.option) {
        //doSomething

        //将组合fabric对象挂载到ref上
        this.ref = new fabric.Group(xxx, option)
      }
  }
const mutations = {
  //排序条改变动画
  CHENGE_ITEM(payload, op) {
    //doSomething
    //返回动画完成的promise
    return new Promise(xxx)
  }
}
const action = {
    //排序条改变行为
    change(payload) {
      return {
        type: 'CHENGE_ITEM',
        payload
      }
    }
  }
 */
  export function setAnim(opFn){
    return (next)=>(cursor)=>{
      if(opFn()){
        return true
      }else{
        return next(cursor)
      }
    }
  }
  export function doFor(initFn,opFn,nextFn){
    let hashDo=false;
    return (start,end)=>(next)=>(cursor)=>{
      if(cursor===end){
        return start
      }
      if(cursor===start){
        if(hashDo){
          nextFn()
        }else{
          initFn()
          hashDo=true
        }
        if(opFn()){
          return start+1;
        }else{
          hashDo=false
          return end+1;
        }
      }
      return next(cursor)
    }
  }
  export function doIf(opFn){
    return (start,end)=>(next)=>(cursor)=>{
      if(cursor===start){
        if(opFn()){
          return start+1;
        }else{
          return end
        }
      }
      return next(cursor)
    }
  }
