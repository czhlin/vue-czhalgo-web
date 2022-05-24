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
        'C',
        'C++',
        `//冒泡排序
    private void sortBubble(int[] a)
    {
        int i,j,temp,len=a.length;
        for(i=0;i<len;i++)
        {
            for(j=0;j<len-i-1;j++)
            {
               if(a[j]>a[j+1]){
                   temp=a[j];
                   a[j]=a[j+1];
                   a[j+1]=temp;
               }
            }
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
          name: '中序遍历'
        }
      ],
      display: {
        edit: true
      },
      base: {},
      /** -------------- */
      sava: { root: null, stack: null, fn: 0 },
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
      console.log(that)
      this.animation()
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
          if (base.isPlay && that.isDraw) {
            setTimeout(() => {
              stack.push(root)
              if (root.left) {
                proorder(root.left)
              } else {
                drawNode(stack.pop())
              }
            }, base.getSpeed())
          } else {
            that.sava.root = root
            that.sava.stack = stack
            that.sava.fn = 0
          }
        }
      }
      const drawNode = function (root) {
        if (base.isPlay && that.isDraw) {
          map.set(root, 'yellow')
          tree.drawTree(context, canvas.width / 2, 20)
          if (root.right) {
            setTimeout(() => {
              proorder(root.right)
            }, base.getSpeed())
          } else {
            setTimeout(() => {
              drawNode(stack.pop())
            }, base.getSpeed())
          }
        } else {
          that.sava.root = root
          that.sava.stack = stack
          that.sava.fn = 1
        }
      }
      switch (this.sava.fn) {
        case 0:
          proorder(root)
          break
        default:
          drawNode(root)
          break
      }
      // this.sava.root = null
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
