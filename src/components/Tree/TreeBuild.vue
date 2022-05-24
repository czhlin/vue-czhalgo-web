<template>
  <div id="app">
    <baseDiv
      ref="base"
      :codeDataList="codeDataList"
      :option="option"
      :title="title"
      :levelList="levelList"
    >
      <div slot="animation-div" class="canvas-div" style="position: relative;">
          <canvas id="canvas" width="600" height="300"></canvas>
          <div id="showMessage">
              <span>{{dataString}}</span>
          </div>
      </div>
       <el-form slot="change-dialog-div">
          <el-form-item label="结点数:" label-width="80px">
              <el-input v-model.number="Player.num" placeholder="结点树数目"></el-input>
          </el-form-item>
      </el-form>
       <el-form slot="add-dialog-div">
          <el-form-item label="先序串:" label-width="60px">
              <el-input type="textarea" v-model="dataString" placeholder="先序字符串"></el-input>
          </el-form-item>
      </el-form>
    </baseDiv>
  </div>
</template>
<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
import { TreeNode, Tree } from '@/assets/js/Tree'
export default {
  data () {
    return {
      codeDataList: [
        `//二叉树创建
public static TreeNode preOrderBuilder(char* s,int len,int* i){
    char c=s[*(i)++];
    TreeNode root=NULL;
    if(c!='#'){

        root=(TreeNode)malloc(sizeof(TreeNode));

        root.left=preOrderBuilder(s,i);

        root.right=preOrderBuilder(s,i);
    }
    return root;
}`,
         `//二叉树创建
public static TreeNode preOrderBuilder(string s,int& i){
    char c=s[i++];
    TreeNode root=null;
    if(c!='#'){

        root=new TreeNode(c);

        root->left=preOrderBuilder(s,i);

        root->right=preOrderBuilder(s,i);
    }
    return root;
}`,
       `//二叉树创建
public static TreeNode preOrderBuilder(String s,int[] i){
    char c=s.charAt(i[0]++);
    TreeNode root=null;
    if(c!='#'){

        root=new TreeNode(c);

        root.left=preOrderBuilder(s,i);

        root.right=preOrderBuilder(s,i);
    }
    return root;
}`
      ],
      option: {
        mode: 'text/x-java',
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        theme: 'dracula'
      },
      title: [
        '先序创建二叉树',
        '自定义二叉树'
      ],
      levelList: [
        {
          name: '树和二叉树'
        },
        {
          name: '二叉树'
        },
        {
          name: '先序新建'
        }
      ],
      base: {},
      canvas: {},
      context: {},
      tree: {},
      treeData: {},
      dataString: '',
      refeshString: '',
      randomString: 'qwertyuiopa###sdfghjklzxcvbnm',
      isDraw: false,
      Player: {
        num: 10,
        status: { fun: -1 },
        line: 0,
        moveCursor: {
          k: 0
        }
      }
    }
  },
  mounted () {
    this.base = this.$refs.base
    this.base.moveCursor = this.moveCursor
    this.base.changeDialog = this.initDataList
    this.base.addDialog = this.initDataList2
    this.randomCreateTree()
    this.initCanvas()
    this.base.changeDataCode(2)
  },
  components: {
    baseDiv
  },
  methods: {
    clear () {
      const that = this.base
      that.isPlay = false
      this.isDraw = false
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      setTimeout(() => {
        this.Player.status.fun = -1
        this.Player.line = 0
        this.Player.moveCursor.k = 0
      }, 800)
    },
    initDataList () {
      const that = this.base
      that.dialogVisible = false
      that.isPlay = false
      this.clear()
      this.randomCreateTree()
      this.tree = new Tree(this.treeData)
    },
    initDataList2 () {
      const that = this.base
      that.inputDialogVisible = false
      that.isPlay = false
      this.clear()
      this.preOrderBuilder()
      this.refeshString = this.dataString
      this.tree = new Tree(this.treeData)
    },
    moveCursor () {
      let k = this.Player.moveCursor.k; const stack = []
      const that = this.base
      const innerLoop = () => {
        if (that.isPlay && this.dataString.length > 0 && !(that.set.has(k))) {
          if (k === 12) {
            k = stack.length > 0 ? stack.pop() : 1
          } else if (k === 4 && this.dataString[0] === '#') {
            k = 11
            this.isDraw = true
            this.drawTree()
          } else if (k === 8) {
            stack.push(10)
            k = 1
          } else if (k === 10) {
            k = 1
          } else {
            k++
          }
          if (k === 6) {
            this.isDraw = true
            this.drawTree()
          } else {
            this.isDraw = false
          }
          that.editor.setCursor(k, 0)
          setTimeout(() => { innerLoop() }, that.getSpeed() * 7 / 4)
        } else if (this.dataString.length === 0) {
          that.editor.setCursor(k + 1, 0)
          that.isPlay = false
          this.dataString = this.refeshString
          this.clear()
        } else {
          that.focus = k
          that.isPlay = false
          this.Player.moveCursor.k = k
        }
      }
      innerLoop()
    },
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      this.tree = new Tree(this.treeData)
    },
    randomCreateTree () {
      this.dataString = ''
      const n = this.Player.num
      const { root, str } = Tree.randomCreateTree(n, this.randomString)
      this.dataString = str
      this.treeData = root
      this.refeshString = this.dataString
    },
    deleteDataSting () {
      this.dataString = this.dataString.substr(1)
    },
    preOrderBuilder () {
      let i = 0
      const preOrder = () => {
        if (i === this.dataString.length) {
          return null
        }
        const c = this.dataString[i++]
        let root = null
        if (c !== '#') {
          root = new TreeNode(c)
          root.left = preOrder()
          root.right = preOrder()
        }
        return root
      }
      this.treeData = preOrder()
    },
    drawTree () {
      const { root, radius, side, beta, minAlpha, stack, alpha } = this.tree
      const base = this.base
      const that = this
      const tree = this.tree
      function preOrderTraverse (ctx, root, x, y, n, alpha) {
        if (base.isPlay && that.isDraw) {
          tree.drawNode(ctx, root.value, x, y, 'red') // 绘制节点
          setTimeout(() => { drawNode(ctx, root, x, y, n, alpha) }, base.getSpeed())
        } else {
          that.Player.status = { fun: 0, ctx, root, x, y, n, alpha }
        }
      }
      function drawNode (ctx, root, x, y, n, alpha) {
        if (base.isPlay && that.isDraw) {
          tree.drawNode(ctx, root.value, x, y, 'green')
          that.deleteDataSting()
          let a = Math.asin(Math.sin(alpha) - radius / (side + 2 * radius))
          const b = beta * 3 / (n * 5)
          const s = side / n
          if (a < minAlpha) {
            a = minAlpha
          }
          if (root.right) {
            const p = { root: root.right, x1: x, y1: y, x2: x + (s + 2 * radius) * Math.sin(alpha), y2: y + (s + 2 * radius) * Math.cos(alpha), alpha1: alpha, alpha2: a - b, n: n + 1, s: s }
            stack.push(p)
          } else {
            stack.push({ root: null })
          }
          if (root.left && that.isDraw) {
            tree.drawLeftLine(ctx, x, y, s, alpha)
            setTimeout(() => { preOrderTraverse(ctx, root.left, x - (s + 2 * radius) * Math.sin(alpha), y + (s + 2 * radius) * Math.cos(alpha), n + 1, a - b) }, base.getSpeed())
          } else {
            setTimeout(() => { drawRightNode(ctx, root, x, y, n, alpha) }, base.getSpeed())
          }
        } else {
          that.Player.status = { fun: 1, ctx, root, x, y, n, alpha }
        }
      }
      function drawRightNode (ctx, root, x, y, n, alpha) {
        if (base.isPlay && that.isDraw) {
          that.deleteDataSting()
          const p = stack.pop()
          if (p.root) {
            tree.drawRightLine(ctx, p.x1, p.y1, p.s, p.alpha1)
            setTimeout(() => { preOrderTraverse(ctx, p.root, p.x2, p.y2, p.n, p.alpha2) }, base.getSpeed())
          } else {
            setTimeout(() => { drawNull(ctx, root, x, y, n, alpha, p) }, base.getSpeed())
          }
        } else {
          that.Player.status = { fun: 2, ctx, root, x, y, n, alpha }
        }
      }
      function drawNull (ctx, root, x, y, n, alpha, p) {
        if (base.isPlay && that.isDraw) {
          if (p.root == null && stack.length > 0) {
            p = stack.pop()
            that.deleteDataSting()
            setTimeout(() => { drawNull(ctx, root, x, y, n, alpha, p) }, base.getSpeed())
          } else {
            if (p.root) {
              tree.drawRightLine(ctx, p.x1, p.y1, p.s, p.alpha1)
              preOrderTraverse(ctx, p.root, p.x2, p.y2, p.n, p.alpha2)
            } else {
              that.deleteDataSting()
            }
          }
        } else {
          that.Player.status = { fun: 3, ctx, root, x, y, n, alpha, p }
        }
      }
      const status = this.Player.status
      switch (status.fun) {
        case 0:
          preOrderTraverse(status.ctx, status.root, status.x, status.y, status.n, status.alpha)
          break
        case 1:
          drawNode(status.ctx, status.root, status.x, status.y, status.n, status.alpha)
          break
        case 2:
          drawRightNode(status.ctx, status.root, status.x, status.y, status.n, status.alpha)
          break
        case 3:
          drawNull(status.ctx, status.root, status.x, status.y, status.n, status.alpha, status.p)
          break
        default:
          preOrderTraverse(this.context, root, this.canvas.width / 2, 20, 1, alpha)
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}
#app  #canvas {
    display: block;
    margin: 0 auto;
}
#showMessage {
    position: absolute;
    bottom: 10%;
    right:  10%;
}
</style>
