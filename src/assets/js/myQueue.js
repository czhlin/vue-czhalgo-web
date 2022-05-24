class Arrow {
  constructor (x, y, color, text, isRight) {
    this.x = x
    this.y = y
    this.color = color
    this.text = text
    this.isRight = isRight
  }

  draw (context) {
    let x = this.x
    let y = this.y
    const color = this.color
    const text = this.text
    context.beginPath()
    context.moveTo(x, y)
    context.fillStyle = color// 设置填充颜色
    context.font = '14px serif'

    if (this.isRight) {
      context.fillText(text, x + 40, y - 10)
      y -= 10 * Math.sin(Math.PI / 6)
      x += 10 * Math.cos(Math.PI / 6)
      context.lineTo(x, y)
      y += 5 * Math.sin(Math.PI / 6)
      context.lineTo(x, y)
      x += 20
      context.lineTo(x, y)
      y += 10 * Math.sin(Math.PI / 6)
      context.lineTo(x, y)
      x -= 20
      context.lineTo(x, y)
      y += 5 * Math.sin(Math.PI / 6)
      context.lineTo(x, y)
    } else {
      context.fillText(text, x - 40, y - 10)
      y += 10 * Math.sin(Math.PI / 6)
      x -= 10 * Math.cos(Math.PI / 6)
      context.lineTo(x, y)
      y -= 5 * Math.sin(Math.PI / 6)
      context.lineTo(x, y)
      x -= 20
      context.lineTo(x, y)
      y -= 10 * Math.sin(Math.PI / 6)
      context.lineTo(x, y)
      x += 20
      context.lineTo(x, y)
      y -= 5 * Math.sin(Math.PI / 6)
      context.lineTo(x, y)
    }
    context.closePath()
    context.lineWidth = 2
    context.fillStyle = color
    context.strokeStyle = '#058'
    context.fill()
    context.stroke()
    context.lineWidth = 1
    context.strokeStyle = '#000'
  }
}
class MyQueue {
  constructor (x, y, w, h, num, data) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.num = num
    this.n = 0
    this.data = Array.from(data)
    this.queue = new Array(this.num)
    this.popStack = []
    this.top = 0
    this.bottom = 0
    this.end = 0
    this.arrowTop = new Arrow(this.x - this.w / 2, this.y - this.h / this.num / 2, 'red', 'front', false)
    this.arrowBottom = new Arrow(this.x + this.w / 2, this.y + this.h / this.num / 2, 'blue', 'rear', true)
  }

  draw (context) {
    let x = this.x - this.w / 2
    let y = this.y - this.h
    context.beginPath()
    context.moveTo(x, y)
    y += this.h
    context.lineTo(x, y)
    x += this.w
    context.moveTo(x, y)
    y -= this.h
    context.lineTo(x, y)
    context.stroke()
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i]) {
        this.queue[i].color = 'yellow'
        this.queue[i].draw(context)
      }
    }
    if (this.n > 0) {
      this.queue[this.top].color = 'green'
      this.queue[this.top].draw(context)
      this.queue[this.end].color = 'blue'
      this.queue[this.end].draw(context)
    }
    this.arrowTop.draw(context)
    this.arrowBottom.draw(context)
  }

  enQueue (flage) {
    if (this.n < this.num) {
      let item
      if (flage) {
        this.end = this.bottom
        item = new Item(this.x - this.w / 2, this.y - ((this.bottom + 1) * (this.h / this.num)), this.w, this.h / this.num, this.data.pop(), 'yellow')
        this.queue[this.bottom] = item
        this.arrowBottom.y = this.y - ((this.bottom + 1) * (this.h / this.num)) + this.h / this.num / 2
        this.bottom = (this.bottom + 1) % this.num
        this.n++
      } else {
        item = new Item(this.x - this.w / 2, this.y - ((this.bottom + 1) * (this.h / this.num)), this.w, this.h / this.num, this.data[this.data.length - 1], 'yellow')
        return item
      }
    } else {
      return null
    }
  }

  deQueue () {
    if (this.n > 0) {
      const item = this.queue[this.top]
      this.queue[this.top] = null
      this.popStack.push(item.text)
      this.top = (this.top + 1) % this.num
      this.arrowTop.y = this.y - (this.top * (this.h / this.num)) - this.h / this.num / 2
      this.n--
      return item
    } else {
      return null
    }
  }
}
class MyStackList {
  constructor (x, y, w, n, text, data, isLeft) {
    this.x = x
    this.y = y
    this.w = w
    this.n = n
    this.text = text
    this.stack = []
    this.isLeft = isLeft
    this.distX = this.x
    this.distY = this.y
    this.animation = null
    this.speedX = 20
    this.isStack = false
    this.speedY = 20;
    (() => {
      let x = this.x + this.w / 2
      let y = this.y
      if (this.isLeft) {
        const pro = this.w / this.n
        this.pro = pro
        x -= this.w * 9 / 10 + pro
        y -= 20
        for (let i = 0; i < data.length; i++) {
          x += pro
          this.stack.push(new Item(x, y, pro, 20, data[i], 'white'))
        }
        this.anX = x
        this.anY = y
      } else {
        const pro = this.w / this.n
        this.pro = pro
        x -= this.w
        x += this.w * 9 / 10
        y -= 20
        for (let i = 0; i < data.length; i++) {
          x -= pro
          this.stack.push(new Item(x, y, pro, 20, data[i], 'white'))
        }
        this.anX = x
        this.anY = y
      }
    })()
  }

  push (val) {
    if (this.isLeft) {
      this.anX += this.pro
      this.stack.push(new Item(this.anX, this.anY, this.pro, 20, val, 'white'))
    } else {
      this.anX -= this.pro
      this.distX = this.anX
      this.distY = this.anY
      val.x += 10
      val.width = this.pro
      val.height = 20
      this.animation = val
    }
  }

  pop () {
    this.animation = this.stack.pop()
  }

  draw (context) {
    let x = this.x - this.w / 2
    const y = this.y
    context.moveTo(x, y)
    x += this.w
    context.lineTo(x, y)
    context.stroke()
    context.font = '14px serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.text, this.x, this.y + 10)
    for (let i = 0; i < this.stack.length; i++) {
      this.stack[i].draw(context)
    }
    if (this.animation && this.isLeft) {
      if (this.animation.x + this.speedX < this.distX) {
        this.animation.x += this.speedX
      } else if (this.animation.x - this.speedX > this.distX) {
        this.animation.y -= this.speedX
      } else {
        this.animation.x = this.distX
      }
      if (this.animation.x === this.distX) {
        if (this.animation.y + this.speedY < this.distY) {
          this.animation.y += this.speedY
        } else if (this.animation.y - this.speedY > this.distY) {
          this.animation.y -= this.speedY
        } else {
          this.animation.y = this.distY
          this.animation = null
        }
      }
      if (this.animation) {
        this.animation.color = 'red'
        this.animation.draw(context)
      }
    } else if (this.animation && !this.isLeft) {
      if (this.animation.y + this.speedY < this.distY) {
        this.animation.y += this.speedY
      } else if (this.animation.y - this.speedY > this.distY) {
        this.animation.y -= this.speedY
      } else {
        this.animation.y = this.distY
      }
      if (this.animation.y === this.distY) {
        if (this.animation.x + this.speedX < this.distX) {
          this.animation.x += this.speedX
        } else if (this.animation.x - this.speedX > this.distX) {
          this.animation.x -= this.speedX
        } else {
          this.animation.x = this.distX
          this.animation.color = 'green'
          this.stack.push(this.animation)
          this.animation = null
        }
      }
      if (this.animation) {
        this.animation.color = 'red'
        this.animation.draw(context)
      }
    }
  }
}
class Item {
  constructor (x, y, width, height, text, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.text = text
    this.color = color
  }

  draw (context) {
    context.beginPath()
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
    context.fillStyle = '#000'
    context.strokeStyle = '#000'
    context.strokeRect(this.x, this.y, this.width, this.height)
    context.stroke()
    context.font = '14px serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2)
  }
}
class OperateList {
  constructor (x, y, w, data, text, index) {
    this.x = x
    this.y = y
    this.w = w
    this.data = Array.from(data)
    this.text = text
    this.index = index
  }

  draw (context) {
    context.beginPath()
    context.moveTo(this.x - this.w / 2, this.y)
    context.fillStyle = 'black'
    context.font = '14px serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.text, this.x, this.y)
    let x = this.x + 25
    const y = this.y
    for (let i = 0; i < this.data.length; i++) {
      x += 10
      context.fillText(this.data[i], x, y)
    }
    context.fillStyle = 'red'
    if (this.index < this.data.length) {
      context.fillText(this.data[this.index], this.x + 25 + (this.index + 1) * 10, y)
    }
  }
}
export {
  MyQueue, OperateList, Item, MyStackList
}
