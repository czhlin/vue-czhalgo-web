/*
 * @Date: 2021-11-25 13:55:40
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 20:14:58
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\BubbleSort\animation.js
 */
import Animation, { Sort } from '@/animation'
import {doFor,doIf,setAnim} from '@/animation/utils'
import {getMiddlewareFn} from '@/utils'
const { exchange, change } = Sort.action
class BubbleSortAnimation extends Animation {
  data={
    i: 0,
    j: 0,
    status: 0,
    arr: [],
    cursor: 1,
    sort: null,
    // 用于解决13位置上是否有动画的bug
    hasAnim:false
  }
  created() {
    const {
      $,
      stage
    } = this
    console.log(stage);
    $.sort = new Sort($.arr, {
      left: stage.width,
      top: stage.height / 2,
      originX: 'center',
      originY: 'center'
    })
    stage.renderAll()
    stage.add($.sort.ref)
    this.initCode()
  }

  get AnimOption() {
    const { stage, state } = this
    return {
      duration: state.speed,
      onChange() {
        stage.renderAll()
      }
    }
  }

  /**动画方法**/
  //选中当两排序条
  activeAnim(i, j) {
    const { $ } = this
    $.arr[i].status = $.arr[i].status || 1
    $.arr[j].status = $.arr[i].status || 1
    return $.sort.doAnim(change(
      $.arr.map((item, index) => (
        {
          status: 
            [1, -1].includes(item.status) && 
            ![i, j].includes(index) 
              ? 0 
              : item.status,
          index
        }
      ))
    ))(this.AnimOption)
  }
  //两排序条交换，flage用于控制交换或者不交换
  exchangeAnim(i, j, flage = true) {
    const { $ } = this
    flage && ([$.arr[i], $.arr[j]] = [$.arr[j], $.arr[i]])
    return $.sort.doAnim(
      (flage ? exchange : change)([
        { index: i, status: -1 },
        { index: j, status: -1 }
      ])
    )(this.AnimOption)
  }
  //某排序条完成时的动画
  completeAnim(i) {
    const { $ } = this
    $.arr[i].status = 2
    return $.sort.doAnim(change([
      { index: i, status: 2 }
    ]))(this.AnimOption)
  }

  // 执行方法
  async doChange() {
    const {
      $,
      action
    } = this

    await this.exchangeAnim(
      $.j,
      $.j + 1,
      $.arr[$.j].value > $.arr[$.j + 1].value
    )

    $.j++
    $.status = 1
    action.startCode()
  }

  async doInnerLoop() {
    const {
      $,
      action
    } = this
    
    if ($.j < $.arr.length - $.i - 1) {
      await this.activeAnim($.j, $.j + 1)
      $.status = 2
    } else {
      await this.completeAnim($.j)
      $.i++
      $.j = 0
      $.status = 0
    }
    action.startCode()
  }

  async doOutLoop() {
    const {
      $,
      action
    } = this
    if ($.i < $.arr.length) {
      await this.doInnerLoop()
    } else {
      action.endAll()
    }
  }

  // 动画执行
  doAnim() {
    const {
      $
    } = this

    switch ($.status) {
      case 0:
        this.doOutLoop()
        break
      case 1:
        this.doInnerLoop()
        break
      case 2:
        this.doChange()
        break
    }
  }

  // 代码动画
  doCode() {
    const {
      action,
      $
    } = this
    // console.log($.arr);
    // 设置下一次的光标
    $.cursor=this.nextCursor($.cursor)
    this.setCursor($.cursor)
    // 判断当前是否需要执行动画
    if(this.hasAnim($.cursor)){
      action.startAnim()
    }else{
      action.startCode()
    }
  }
  // 初始化代码动画
  initCode(){
    const {
      $
    } = this
    
    this.nextCursor=getMiddlewareFn([
        doFor(
          ()=>{},
          ()=>($.i<$.arr.length),
          ()=>{}
        )(5,15),
        doFor(
          ()=>{},
          ()=>($.j<$.arr.length-$.i-1),
          ()=>{}
        )(7,14),
        doIf(
          ()=>{
            $.hasAnim=!($.arr[$.j].value>$.arr[$.j+1].value)
            return !$.hasAnim
          }
        )(9,13)
    ],cursor=>cursor+1)

    this.hasAnim=getMiddlewareFn([
      setAnim(
        ()=>([15,9,12,16].includes($.cursor))
      ),
      setAnim(
        ()=>{
          if($.cursor===13){
            console.log($.j,$.arr,$.j+1);
          }
          return  ($.cursor===13)&&$.hasAnim
        }
      )
    ],()=>false)
  }
}
export default BubbleSortAnimation
