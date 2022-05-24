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
          <el-col :span="20" class="build-canvas">
            <canvas id="builder" width="500" height="300"></canvas>
          </el-col>
          <el-col :span="3" class="build-box">
            <el-button type="primary" class="build-btn" size="mini" plain @click="buildTree">自动建树</el-button>
          </el-col>
        </el-row>
      </div>
    </baseDiv>
  </div>
</template>
<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
import { Tree } from '@/assets/js/Tree'
export default {
  data () {
    return {
      codeDataList: [
        `//二叉树的先序遍历
void proorder(TreeNode *root){
    if(root!=NULL){
      printf("%d",root.val);
      inorder(root.left);
      inorder(root.right);
    }
`,
        `//二叉树的先序遍历
void proorder(TreeNode *root){
    if(root!=null){
      cout<<root->val<<endl;
      inorder(root->left);
      inorder(root->right);
    }
}`,
        `//二叉树的先序遍历
public void proorder(TreeNode root){
    if(root!=null){
      System.out.println(root.val);
      inorder(root.left);
      inorder(root.right);
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
          name: '先序遍历'
        }
      ],
      display: {
        edit: true
      },
      base: {},
      /** -------------- */
      sava: { root: null, stack: null },
      player: { k: 0, i: 0, stack: [] },
      isDraw: true,
      canvas: {},
      builder: {},
      context: {},
      bctx: {},
      tree: {},
      treeData: {},
      treeStr: '',
      randomString: 'qwertyuiopa###sdfghjklzxcvbnm'
    }
  },
  components: {
    baseDiv
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
          } else if (k === 4 || k === 5) {
            stack.push(k + 1)
            k = 1
          } else if (k === 6 && i < this.treeStr.length) {
            k = stack.pop() || 1
          } else {
            k++
          }
          that.editor.setCursor(k, 0)
          if (k === 3) {
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
    /** *--------------------- */
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
    },
    buildTree () {
      if (this.builder) {
        this.builder.width += 0
      }
      this.builder = document.getElementById('builder')
      this.bctx = this.builder.getContext('2d')
      const { root, str } = Tree.randomCreateTree(20, this.randomString)
      this.treeData = root
      this.tree = new Tree(root)
      this.treeStr = str
      this.tree.drawTree(this.bctx, this.builder.width / 2, 20)
    },
    animation () {
      const map = this.tree.map
      const root = this.sava.root || this.tree.root
      const tree = this.tree
      const context = this.context
      const canvas = this.canvas
      const base = this.base
      const stack = this.sava.stack || []
      const that = this
      const proorder = function (root) {
        if (root) {
          setTimeout(() => {
            drawNode(root)
          }, base.getSpeed())
        }
      }
      const drawNode = function (root) {
        if (base.isPlay && that.isDraw) {
          map.set(root, 'yellow')
          that.isDraw = false
          tree.drawTree(context, canvas.width / 2, 20)
          if (root.right) {
            stack.push(root.right)
          }
          if (root.left) {
            setTimeout(() => {
              proorder(root.left)
            }, base.getSpeed())
          } else if (stack.length > 0) {
            setTimeout(() => {
              proorder(stack.pop())
            }, base.getSpeed())
          }
        } else {
          that.sava.root = root
          that.sava.stack = stack
        }
      }
      proorder(root)
    }
  }
}
</script>
<style lang="less" scoped>
  .build-box {
    height:300px;
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
