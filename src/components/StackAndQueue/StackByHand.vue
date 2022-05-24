<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
         <canvas id="canvas" width="600" height="300"></canvas>
      </div>
      <div slot="change-dialog-div">
      </div>
      <div slot="add-dialog-div">
      </div>
      <div slot="button-group">
        <el-button-group>
          <el-button type="warning" icon="el-icon-plus" @click="push">入栈</el-button>
          <el-button type="info" icon="el-icon-setting"  @click="dialogVisible=true"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="pop">出栈</el-button>
        </el-button-group>
      </div>
    </baseDiv>
    <el-dialog
        title="修改待入栈数据"
        :visible.sync="dialogVisible"
        width="30%"
    >
        <el-form>
          <el-form-item label="待入栈数组:" label-width="100px">
              <el-input v-model="dataString" placeholder="待入栈数据"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeDialog()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
import { MyStack, MyStackList } from '@/assets/js/myStack'
export default {
  data () {
    return {
      codeDataList: [
        'C',
        'C++',
        `//入栈
public void push(Object x) throws Exception{
    if(top==stackElem.length){
        throw new Exception("栈已满！");
    }
    else{
        stackElem[top++]=x;
    }
}
//出栈
public Object pop() throws Exception{
    if(top==0){
        throw new Exception("栈为空！");
    }
    else{
        return stackElem[--top];  //删除然后返回现在的栈顶
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
        '修改数据',
        '输入数据'
      ],
      levelList: [
        {
          name: '栈和队列'
        },
        {
          name: '栈'
        },
        {
          name: '手动出入栈'
        }
      ],
      base: {},
      canvas: {},
      context: {},
      stack: {},
      stack1: {},
      stack2: {},
      oplist: {},
      arr: [2, 4, 5, 1, 3, 1, 3],
      dataString: '',
      opArr: [],
      isAnimation: true,
      isMoveCursor: true,
      dialogVisible: false,
      flage: false,
      isEnd: false,
      Player: {
        line: 0,
        i: 0
      }
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
    this.dataString = this.arr.toString()
    this.initCanvas()
    this.stack = new MyStack(320, 200, 40, 100, 5, this.arr)
    this.stack1 = new MyStackList(100, 50, 200, 10, '入栈序列', this.arr, true)
    this.stack2 = new MyStackList(500, 50, 200, 10, '出栈序列', [], false)
    this.stack1.draw(this.context)
    this.stack2.draw(this.context)
    this.stack.draw(this.context)
  },
  methods: {
    moveCursor () {
      let k = this.Player.line
      let i = this.Player.i
      const that = this.base
      console.log(that.focus)
      const innerLoop = () => {
        if (this.isMoveCursor && !this.isEnd && !(that.set.has(k))) {
          if (k === 4) {
            k = 7
          } else if (k === 13) {
            k = 16
          } else if (k === 8) {
            if (this.opArr[i] === 1) {
              k = 1
            } else {
              k = 10
            }
          } else if (k === 17) {
            if (this.opArr[i] === 1) {
              k = 1
            } else {
              k = 10
            }
          } else if (k === 2) {
            if (this.stack.top === this.stack.num) {
              k = 3
            } else {
              k = 5
            }
          } else if (k === 11) {
            if (this.stack.top === 0) {
              k = 12
            } else {
              k = 14
            }
          } else k++
          if (k === 3 || k === 12 || k === 6 || k === 15) {
            this.isAnimation = true
            i++
          } else {
            this.isAnimation = false
          }
          that.editor.setCursor(k, 0)
          setTimeout(() => { innerLoop() }, that.getSpeed())
        } else {
          if (this.isEnd) {
            this.isEnd = false
          }
          this.Player.line = k
          this.Player.i = i
          that.focus = k
        }
      }
      innerLoop()
      if (!this.flage) {
        this.animation()
        this.flage = true
      }
    },
    push () {
      this.opArr.push(1)
      this.moveCursor()
    },
    pop () {
      this.opArr.push(0)
      this.moveCursor()
    },
    getArray (str) {
      str = str.replace(/(\[|\])/g, '').trim()
      const arr1 = str.split(' ')
      const arr2 = str.split(',')
      const array = arr1.length > arr2.length ? arr1 : arr2
      const res = []
      for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i]) && array[i] !== '') {
          res.push(Number(array[i]))
        }
      }
      return res
    },
    changeDialog () {
      console.log(this.getArray(this.dataString))
      this.arr = this.getArray(this.dataString)
      this.canvas.width += 0
      this.stack = new MyStack(320, 200, 40, 100, 5, this.arr)
      this.stack1 = new MyStackList(100, 50, 200, 10, '入栈序列', this.arr, true)
      this.stack2 = new MyStackList(500, 50, 200, 10, '出栈序列', [], false)
      this.stack.draw(this.context)
      this.stack1.draw(this.context)
      this.stack2.draw(this.context)
      this.dialogVisible = false
    },
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
    },
    animation () {
      const stack = this.stack
      const stack1 = this.stack1
      const stack2 = this.stack2
      let i = this.Player.i
      let flage = true
      let flage2 = true
      const myAnimation = () => {
        if (this.isAnimation) {
          this.canvas.width += 0
          if (flage && this.opArr[i] === 1) {
            const distItem = stack.push(false)
            if (distItem) {
              stack1.distX = distItem.x + 10
              stack1.distY = distItem.y
              stack1.pop()
              this.isMoveCursor = false
              flage = false
            } else {
              flage2 = false
              this.$message.error('栈已满,不能入栈!')
            }
          } else if (flage) {
            const item = stack.pop()
            if (item) {
              stack2.push(item)
              this.isMoveCursor = false
              flage = false
            } else {
              flage2 = false
              this.$message.error('栈为空,不能出栈!')
            }
          }
          if (!stack1.animation && this.opArr[i] === 1) {
            stack.push(true)
            flage = true
            i++
            this.isMoveCursor = true
            this.isAnimation = false
            if (flage2) {
              this.moveCursor()
            } else {
              flage2 = true
            }
          } else if (!stack2.animation && this.opArr[i] === 0) {
            flage = true
            i++
            this.isMoveCursor = true
            this.isAnimation = false
            if (flage2) {
              this.moveCursor()
            } else {
              flage2 = true
            }
          }
          stack1.draw(this.context)
          stack2.draw(this.context)
          stack.draw(this.context)
        }
        if (i < this.opArr.length) {
          setTimeout(() => {
            myAnimation()
          }, this.base.getSpeed() / 5)
        } else {
          this.flage = false
          this.isEnd = true
        }
      }
      myAnimation()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
