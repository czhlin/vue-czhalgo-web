/*
 * @Date: 2021-12-27 12:31:25
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-20 21:46:38
 * @FilePath: \graduation-project\vue-czhalgo-web\src\animation\sort\item.js
 */
import { fabric } from 'fabric'
class Item {
  constructor(data) {
    this.init(data)
  }

  init(
    data = {
      color: 'green',
      text: 'hello',
      width: 20,
      height: 100,
      x: 0,
      y: 0
    }
  ) {
    const {
      color,
      text,
      width,
      height,
      x,
      y
    } = data
    this.data = data
    
    const Line = new fabric.Rect({
      width,
      height,
      fill: color,
      originX: 'center',
      originY: 'center'
    })
    const Text = new fabric.Text(
      text,
      {
        fontSize: 12,
        left: 0,
        top: -height / 2,
        originX: 'center',
        originY: 'bottom'
      }
    )
    //将fabric对象挂载到this.ref
    this.ref = new fabric.Group([Line, Text], {
      top: y,
      left: x,
      originX: 'center',
      originY: 'bottom'
    })
    //扩展fill属性，用于填充长条的颜色
    Object.defineProperties(this.ref, {
      fill: {
        get() {
          return Line.fill
        },
        set(val) {
          Line.fill = val
        }
      }
    })
  }
}
export default Item
