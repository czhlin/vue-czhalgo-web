<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :display='display' :levelList="levelList">
      <div slot="animation-div">
        <canvas id="canvas" width="600" height="300"></canvas>
      </div>
      <div slot="change-dialog-div">
      </div>
      <div slot="add-dialog-div">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="24" :md="24" :lg="21" :xl="21" class="build-canvas">
            <!-- <canvas  width="500" height="300"></canvas> -->
            <canvasDiv ref="canvas"></canvasDiv>
          </el-col>
          <el-col  :xs="24" :sm="24" :md="24" :lg="3" :xl="3" class="build-box">
            <el-button type="primary" class="build-btn" size="mini" plain @click="buildTree">自动建树</el-button>
          </el-col>
        </el-row>
      </div>
    </baseDiv>
  </div>
</template>
<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
import canvasDiv from '@/components/utils/CanvasDiv/CanvasDiv'
import { Tree } from '@/assets/js/Tree'
export default {
  data () {
    return {
      codeDataList: [
        'C',
        'C++',
        `//二叉树的后序遍历
public void proorder(TreeNode root){
    if(root!=null){
      inorder(root.left);
      inorder(root.right);
      System.out.println(root.val);
    }
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
        '更改数组',
        '输入数据'
      ],
      levelList: [
        {
          name: '树和二叉树'
        },
        {
          name: '二叉树'
        },
        {
          name: '后序遍历'
        }
      ],
      display: {
        edit: true
      },
      base: {},
      /** -------------- */
      sava: { root: null, stack: null, set: null },
      player: { k: 0, i: 0, stack: [] },
      isDraw: true,
      canvas: {},
      builder: null,
      context: {},
      bctx: {},
      tree: {},
      treeData: {},
      treeStr: '',
      randomString: 'qwertyuiopa###sdfghjklzxcvbnm'
    }
  },
  components: {
    baseDiv,
    canvasDiv
  },
  mounted () {
    this.base = this.$refs.base
    this.base.moveCursor = this.moveCursor
    this.base.changeDialog = this.changeDialog
    this.base.addDialog = this.addDialog
    this.base.changeDataCode(2)
    /** *---------- */
    this.initCanvas()
  },
  methods: {
    moveCursor () {
      const that = this.base
      let { k, i, stack } = this.player
      const innerLoop = () => {
        if (that.isPlay && !(that.set.has(k)) && i < this.treeStr.length) {
          if (k === 2) {
            if (this.treeStr[i++] === '#') {
              k = 6
            } else {
              k++
            }
          } else if (k === 3 || k === 4) {
            stack.push(k + 1)
            k = 1
          } else if (k === 6 && i < this.treeStr.length) {
            k = stack.pop() || 1
          } else {
            k++
          }
          that.editor.setCursor(k, 0)
          if (k === 5) {
            this.isDraw = true
            this.animation()
          }
          setTimeout(() => {
            this.isDraw = false
            innerLoop()
          }, that.getSpeed())
        } else if (i === this.treeStr.length) {
          this.clear()
        } else {
          that.focus = k
          that.isPlay = false
          this.player = { k, i, stack }
        }
      }
      innerLoop()
    },
    clear () {
      this.sava = { root: null, stack: null }
      this.player = { k: 0, i: 0, stack: [] }
      this.isDraw = true
      this.base.focus = 0
      this.base.isPlay = false
      this.canvas.width += 0
      setTimeout(() => {
        this.tree.clear()
        this.tree.drawTree(this.context, this.canvas.width / 2, 20)
      }, 0)
    },
    changeDialog () {

    },
    addDialog () {
      if (this.tree.drawTree) {
        this.canvas.width += 0
        this.tree.drawTree(this.context, this.canvas.width / 2, 20)
      }
      const that = this.base
      that.inputDialogVisible = false
    },
    drawStarMap () {
      this.builder.context.clearRect(0, 0, this.builder.canvas.width, this.builder.canvas.height)
      this.tree.drawTree(this.builder.context, this.builder.canvas.width / 2, 20, this.builder.canvas.width / 500)
    },
    /** *--------------------- */
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
    },
    buildTree () {
      if (!this.builder) {
        this.builder = this.$refs.canvas
        this.builder.drawStarMap = this.drawStarMap
      }
      // console.log(this.builder)
      this.builder.canvas.width += 0
      const { root, str } = Tree.randomCreateTree(20, this.randomString)
      this.treeData = root
      this.tree = new Tree(root)
      this.treeStr = str
      this.drawStarMap()
    },
    animation () {
      const map = this.tree.map
      const root = this.sava.root || this.tree.root
      const tree = this.tree
      const context = this.context
      const canvas = this.canvas
      const base = this.base
      const stack = this.sava.stack || []
      const set = this.sava.set || new Set()
      const that = this
      const proorder = function (root) {
        if (root) {
          stack.push(root)
          if (root.left && !set.has(root.left)) {
            proorder(root.left)
          } else if (root.right && !set.has(root.right)) {
            proorder(root.right)
          } else {
            drawNode(stack.pop())
          }
        }
      }
      const drawNode = function (root) {
        if (base.isPlay && that.isDraw) {
          map.set(root, 'yellow')
          tree.drawTree(context, canvas.width / 2, 20)
          set.add(root)
          setTimeout(() => {
            proorder(stack.pop())
          }, base.getSpeed())
        } else {
          that.sava.root = root
          that.sava.stack = stack
          that.sava.set = set
        }
      }
      proorder(root)
    }
  }
}
</script>
<style lang="less" scoped>
  .build-box {
    height:100px;
    position: relative;
    .build-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .build-canvas {
    border: 1px solid pink;
  }
  .add-dialog-div {
    width: 1000px;
  }
</style>
