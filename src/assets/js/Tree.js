const TreeNode = function (val) {
  this.value = val
  this.left = null
  this.right = null
}
TreeNode.prototype.getVal = function () {
  return this.value
}
const Tree = function (root) {
  this.root = root
  this.alpha = Math.PI * 5 / 12
  this.radius = 12
  this.side = 100
  this.minAlpha = Math.asin(this.radius / (this.side + this.radius * 2))
  this.beta = Math.PI / 6
  this.stack = []
  this.map = new Map()
  console.log(this.map)
}
Tree.randomCreateTree = function (n, randomString) {
  function createTree (deep) {
    if (deep > 5 || n === 0) {
      return null
    }
    const i = Math.floor(Math.random() * (randomString.length - 1))
    const c = randomString[i]
    let root = null
    if (c !== '#') {
      root = new TreeNode(c)
      n--
      root.left = createTree(deep + 1)
      root.right = createTree(deep + 1)
    } else if (deep === 1 && c === '#') {
      return createTree(deep)
    }
    return root
  }
  function proorder (root) {
    if (!root) return '#'
    return `${root.value}${proorder(root.left)}${proorder(root.right)}`
  }
  function inorder (root) {
    if (!root) return '#'
    return `${inorder(root.left)}${root.value}${inorder(root.right)}`
  }
  function postorder (root) {
    if (!root) return '#'
    return `${postorder(root.left)}${postorder(root.right)}${root.value}`
  }
  const root = createTree(1)
  return {
    root,
    str: proorder(root),
    str2: inorder(root),
    str3: postorder(root)
  }
}
Tree.prototype.getDeepOfTree = function (root) { // 得到该树的高度
  if (!root) {
    return 0
  }
  const left = this.getDeepOfTree(root.left)
  const right = this.getDeepOfTree(root.right)
  return (left > right) ? left + 1 : right + 1
}
Tree.prototype.drawNode = function (ctx, text, x, y, color) {
  ctx.beginPath()
  ctx.moveTo(x + this.radius, y)
  ctx.arc(x, y, this.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = color// 设置填充颜色
  ctx.fill()// 开始填充
  ctx.stroke()
  ctx.fillStyle = '#000'// 设置填充颜色
  ctx.font = '14px serif'
  ctx.fillText(text, x, y)
}
Tree.prototype.drawLeftLine = function (ctx, x, y, s, alpha) {
  ctx.beginPath()
  ctx.moveTo(x - this.radius * Math.sin(alpha), y + this.radius * Math.cos(alpha))
  ctx.lineTo(x - (this.radius + s) * Math.sin(alpha), y + (this.radius + s) * Math.cos(alpha))
  ctx.stroke()
}
Tree.prototype.drawRightLine = function (ctx, x, y, s, alpha) {
  ctx.beginPath()
  ctx.moveTo(x + this.radius * Math.sin(alpha), y + this.radius * Math.cos(alpha))
  ctx.lineTo(x + (this.radius + s) * Math.sin(alpha), y + (this.radius + s) * Math.cos(alpha))
  ctx.stroke()
}
Tree.prototype.clear = function () {
  for (const key of this.map.keys()) {
    this.map.set(key, 'green')
  }
}
Tree.prototype.drawTree = function (ctx, x, y, m = 1) {
  const { root, radius, side, beta, minAlpha, alpha } = this
  const tree = this
  function preOrderTraverse (root, x, y, n, alpha) {
    if (root) {
      if (!tree.map.has(root)) {
        tree.map.set(root, 'green')
      }
      tree.drawNode(ctx, root.value, x, y, tree.map.get(root))
      const s = side / n * m
      let a = Math.asin(Math.sin(alpha) - radius / (side + 2 * radius))
      const b = beta * 3 / (n * 5)
      if (a < minAlpha) {
        a = minAlpha
      }
      if (root.left) {
        tree.drawLeftLine(ctx, x, y, s, alpha)
        preOrderTraverse(root.left, x - (s + 2 * radius) * Math.sin(alpha), y + (s + 2 * radius) * Math.cos(alpha), n + 1, a - b)
      }
      if (root.right) {
        tree.drawRightLine(ctx, x, y, s, alpha)
        preOrderTraverse(root.right, x + (s + 2 * radius) * Math.sin(alpha), y + (s + 2 * radius) * Math.cos(alpha), n + 1, a - b)
      }
    }
  }
  preOrderTraverse(root, x, y, 1, alpha)
}

export {
  TreeNode, Tree
}
