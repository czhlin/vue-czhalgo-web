/*
 * @Date: 2021-12-28 12:31:51
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 12:34:09
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\utils\math.js
 */
/**
 *
 * @param {*} arr 数组
 * @returns 数组中的最大和最小值
 */
export function getMaxAndMin(arr) {
  return arr.reduce((pre, cur) => {
    pre[0] = cur.value > pre[0] ? cur.value : pre[0]
    pre[1] = cur.value < pre[1] ? cur.value : pre[1]
    return pre
  }, [Number.MIN_VALUE, Number.MAX_VALUE])
}
