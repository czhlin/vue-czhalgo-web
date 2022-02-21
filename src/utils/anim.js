/*
 * @Date: 2021-12-27 17:40:13
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-20 21:11:32
 * @FilePath: \graduation-project\vue-czhalgo-web\src\utils\anim.js
 */
/**
 * 
 * @param {*} thisArg fabric 图形对象
 * @returns fn(obj,op)=>promise
 */
export function animation(thisArg) {
  return (obj, op = {}) => (
    new Promise((resolve, reject) => {
      thisArg.animate(obj, {
        ...op,
        onComplete() {
          resolve()
        }
      })
    })
  )
}
