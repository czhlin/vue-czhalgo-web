/*
 * @Date: 2021-11-25 13:55:40
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 21:22:05
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\MergeSort\animation.js
 */
import Animation, { LinkList} from '@/animation'
import {doFor,doIf,setAnim} from '@/animation/utils'
import {getMiddlewareFn} from '@/utils'
class ChangeLinkListAnimation extends Animation {
  data={
    i:0,
    linkListArr:[
      {color:'red',text:'A'},
      {color:'yellow',text:'12'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'},
      {color:'red',text:'A'}
    ],
    cursor:1,
    linkList:null
  }
  created() {
    const {
      $,
      stage,
      anim,
      state,
      action
    } = this
    // this.setCursor()
    //doSomeThing
    $.linkList = new LinkList($.linkListArr, {
      left: stage.width,
      top: stage.height / 2,
      originX: 'center',
      originY: 'center',
      op:this.AnimOption
    })
    stage.renderAll()
    stage.add($.linkList.ref)
    this.initCode()
  }

  get AnimOption() {
    const { stage, state } = this
    console.log(state);
    return {
      duration: state?.speed||3000,
      onChange() {
        stage.renderAll()
      }
    }
  }

  /**动画方法**/
  
  // 执行方法
  
  // 动画执行
  doAnim() {
    //doSomething
  }

  // 代码动画
  doCode() {
   //doSomething
   this.initCode()
  }
  // 初始化代码动画
  initCode(){
    const {
      comp
    }=this
    console.log(comp,this.comp);
    //doSomething
  }
}
export default ChangeLinkListAnimation
