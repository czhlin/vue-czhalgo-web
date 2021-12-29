/*
 * @Date: 2021-11-25 13:55:40
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-29 16:09:06
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\views\sort\BubbleSort\animation.js
 */
import Animation, { Sort } from '@/animation'
// import { fabric } from 'fabric'
const { exchange, change } = Sort.action
class BubbleSortAnimation extends Animation {
  // 声明data
  data={
    i: 0,
    j: 0,
    status: 0,
    arr: [
      {
        value: 20,
        status: 0
      },
      {
        value: 1,
        status: 0
      },
      {
        value: 30,
        status: 0
      },
      {
        value: 25,
        status: 0
      },
      {
        value: 20,
        status: 0
      },
      {
        value: 1,
        status: 0
      },
      {
        value: 30,
        status: 0
      },
      {
        value: 25,
        status: 0
      },
      {
        value: 20,
        status: 0
      },
      {
        value: 1,
        status: 0
      },
      {
        value: 30,
        status: 0
      },
      {
        value: 25,
        status: 0
      }
    ],
    cursor: 1,
    sort: null
  }

  created() {
    const {
      $,
      stage
    } = this
    $.sort = new Sort($.arr, {
      left: stage.width,
      top: stage.height / 2,
      originX: 'center',
      originY: 'center'
    })
    stage.renderAll()
    stage.add($.sort.ref)
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

  // 动画方法
  activeAnim(i, j) {
    const { $ } = this
    $.arr[i].status = $.arr[i].status || 1
    $.arr[j].status = $.arr[i].status || 1
    return $.sort.doAnim(change(
      $.arr.map((item, index) => (
        {
          status: [1, -1].includes(item.status) && ![i, j].includes(index) ? 0 : item.status,
          index
        }
      ))
    ))(this.AnimOption)
  }

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
      action.startCode()
    } else {
      await this.completeAnim($.j)

      $.i++
      $.j = 0
      $.status = 0
      action.startCode()
    }
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
      state,
      $
    } = this
    setTimeout(() => {
      this.setCursor(++$.cursor)
      action.startAnim()
    }, state.speed)
  }

  doFor(fn, index, callback, arr = [0, 5]) {
    const [start, end] = arr
    if (index === start && fn()) {
      index++
    } else if (index > start && index < end) {
      callback()
    } else {
      index = end
    }
  }
}
export default BubbleSortAnimation
