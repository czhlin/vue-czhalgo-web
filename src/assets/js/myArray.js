const Rect = function (x, y, width, height, color, value) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.color = color
  this.value = value
}
function drawArrow (context, x, y, color) {
  context.beginPath()
  context.moveTo(x, y)
  x += 10 * Math.sin(Math.PI / 6)
  y -= 10 * Math.cos(Math.PI / 6)
  context.lineTo(x, y)
  x -= 5 * Math.sin(Math.PI / 6)
  context.lineTo(x, y)
  y -= 20
  context.lineTo(x, y)
  x -= 10 * Math.sin(Math.PI / 6)
  context.lineTo(x, y)
  y += 20
  context.lineTo(x, y)
  x -= 5 * Math.sin(Math.PI / 6)
  context.lineTo(x, y)
  context.closePath()
  context.lineWidth = 2
  context.fillStyle = color
  context.strokeStyle = '#058'
  context.fill()
  context.stroke()
}
Rect.prototype.draw = function (context) {
  context.beginPath()
  context.fillStyle = this.color
  context.fillRect(this.x, this.y, this.width, this.height)
  context.fillStyle = '#000'// 设置填充颜色
  context.strokeStyle = '#000'
  context.strokeRect(this.x, this.y, this.width, this.height)
  context.stroke()
  context.font = '14px serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2)
}
const MyArray = function (x, y, offset, boxHight, arr) {
  this.drawItems = null
  this.offset = offset
  this.boxHight = boxHight
  this.x = x
  this.y = y
  this.setArr(arr)
}
MyArray.prototype.setArr = function (arr) {
  this.arr = arr
  this.drawItems = []
  let drawItem
  for (let i = 0; i < this.arr.length; i++) {
    drawItem = new Rect(this.x + i * this.offset, this.y, this.offset, this.boxHight, 'white', this.arr[i])
    this.drawItems.push(drawItem)
  }
}
MyArray.prototype.add = function (val) {
  const drawItem = new Rect(this.x + (this.drawItems.length) * this.offset, this.y, this.offset, this.boxHight, 'white', val)
  this.drawItems.push(drawItem)
}
MyArray.prototype.draw = function (context) {
  let drawItem
  for (let i = 0; i < this.drawItems.length; i++) {
    drawItem = this.drawItems[i]
    drawItem.draw(context)
  }
}
export {
  MyArray, Rect, drawArrow
}
