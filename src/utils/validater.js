/*
 * @Date: 2022-02-21 20:25:38
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 20:25:38
 * @FilePath: \graduation-project\vue-czhalgo-web\src\utils\validater.js
 */
export const arrValidater=(rule, value, callback)=>{
    let arr=value.trim()
      .split(',')
      .map(item=>Number(item===''?NaN:item));
      if(arr.length<5){
        callback(new Error('数据长度不足5个'))
      }else if(arr.every(item=>(!isNaN(item)))){
        callback()
      }else{
        callback(new Error('含有非数字'))
      }
  }