/*
 * @Date: 2021-12-27 17:40:13
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 12:23:13
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\utils\anim.js
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
