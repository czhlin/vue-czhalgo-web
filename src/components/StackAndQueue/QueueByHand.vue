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
          <el-button type="warning" icon="el-icon-plus" @click="push">入队列</el-button>
          <el-button type="info" icon="el-icon-setting"  @click="dialogVisible=true"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="pop">出队列</el-button>
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
import { MyQueue, MyStackList } from '@/assets/js/myQueue'
export default {
  data () {
    return {
      codeDataList: [
        'C',
        'C++',
        `//入队列
public void enQueue(Object x) throws Exception{
    if((Q.rear + 1) % MAXSIZE == Q.front){
        throw new Exception("队列已满！");
    }
    else{
        Q.base[Q.rear] = x;
        Q.rear = (Q.rear + 1) % MAXSIZE;
    }
}
//出队列
public Object deQueue() throws Exception{
    if(Q.rear == Q.front){
        throw new Exception("队列为空！");
    }
    else{
        Q.front = (Q.front + 1) % MAXSIZE;
        return Q.base[Q.front-1];  //删除然后返回现在的栈顶
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
          name: '队列'
        },
        {
          name: '手动出入队'
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
    this.queue = new MyQueue(320, 200, 40, 100, 5, this.arr)
    this.stack1 = new MyStackList(100, 50, 200, 10, '入队列序列', this.arr, true)
    this.stack2 = new MyStackList(500, 50, 200, 10, '出队列序列', [], false)
    this.stack1.draw(this.context)
    this.stack2.draw(this.context)
    this.queue.draw(this.context)
  },
  methods: {
    moveCursor () {
      let k = this.Player.line
      let i = this.Player.i
      const that = this.base
      const innerLoop = () => {
        if (this.isMoveCursor && !this.isEnd && !(that.set.has(k))) {
          if (k === 4) {
            k = 8
          } else if (k === 14) {
            k = 18
          } else if (k === 9) {
            if (this.opArr[i] === 1) {
              k = 1
            } else {
              k = 11
            }
          } else if (k === 19) {
            if (this.opArr[i] === 1) {
              k = 1
            } else {
              k = 11
            }
          } else if (k === 2) {
            if (this.queue.n === this.queue.num) {
              k = 3
            } else {
              k = 5
            }
          } else if (k === 12) {
            if (this.queue.n === 0) {
              k = 13
            } else {
              k = 15
            }
          } else k++
          if (k === 3 || k === 6 || k === 13 || k === 16) {
            this.isAnimation = true
            i++
          } else {
            this.isAnimation = false
          }
          that.editor.setCursor(k, 0)
          setTimeout(() => { innerLoop() }, that.getSpeed() / 2)
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
      this.arr = this.getArray(this.dataString)
      this.canvas.width += 0
      this.stack = new MyQueue(320, 200, 40, 100, 5, this.arr)
      this.stack1 = new MyStackList(100, 50, 200, 10, '入队列序列', this.arr, true)
      this.stack2 = new MyStackList(500, 50, 200, 10, '出队列序列', [], false)
      this.queue.draw(this.context)
      this.stack1.draw(this.context)
      this.stack2.draw(this.context)
      this.dialogVisible = false
    },
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
    },
    animation () {
      const queue = this.queue
      const stack1 = this.stack1
      const stack2 = this.stack2
      let i = this.Player.i
      let flage = true
      let flage2 = true
      const myAnimation = () => {
        if (this.isAnimation) {
          this.canvas.width += 0
          if (flage && this.opArr[i] === 1) {
            const distItem = queue.enQueue(false)
            if (distItem) {
              stack1.distX = distItem.x + 10
              stack1.distY = distItem.y
              stack1.pop()
              this.isMoveCursor = false
              flage = false
            } else {
              flage2 = false
              this.$message.error('队列已满,不能入队列!')
            }
          } else if (flage) {
            const item = queue.deQueue()
            if (item) {
              stack2.push(item)
              this.isMoveCursor = false
              flage = false
            } else {
              flage2 = false
              this.$message.error('队列为空,不能出队列!')
            }
          }
          if (!stack1.animation && this.opArr[i] === 1) {
            flage = true
            i++
            this.isMoveCursor = true
            this.isAnimation = false
            if (flage2) {
              queue.enQueue(true)
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
          queue.draw(this.context)
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
