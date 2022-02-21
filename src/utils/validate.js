

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'czhlin']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
export function objKeyValueIsSame(objOne, objTwo) {
  const keysOne = Object.keys(objOne) // 获取对象1所有键数组
  const keysTwo = Object.keys(objTwo) // 获取对象1所有键数组
  if (keysOne.length !== keysTwo.length){
    return false // 对比一下键得长度是否相等，如果不等则直接返回true
  }
  // 开始遍历键去获取对象值对比，我们思路是值不匹配则返回false，但是如果匹配则则什么都不要，继续循环，直到循环结束，没有返回false就行了
  for (const key of keysOne) {
    let isContinue=true;
    if (typeof objOne[key] === 'object' && objOne[key] !== null) { // 如果是对象，则再递归对比，如果递归返回false，则直接方法也直接返回false
      isContinue=objKeyValueIsSame(objOne[key], objTwo[key])
    } else if (typeof objOne[key] === 'function' || typeof objOne[key] === 'symbol') { // 如果是function或symbol，转字符串再对比，不匹配则直接返回false
      isContinue=String(objOne[key]) === String(objTwo[key])
    } else { // 最后其他类型用es6得Object.is()来比较，不匹配直接返回false
      isContinue=Object.is(objOne[key], objTwo[key]) 
    }
    if(!isContinue){
      return false
    }
  }
  return true // 遍历结束了没有返回false，说明没有问题，这里直接返回true，表示键值全等了
}
