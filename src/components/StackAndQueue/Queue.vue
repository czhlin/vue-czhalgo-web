<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :display="display" :levelList="levelList">
      <div slot="animation-div">
         <canvas id="canvas" width="600" height="300"></canvas>
      </div>
      <el-form slot="change-dialog-div">
          <el-form-item label="待入栈:" label-width="80px">
              <el-input v-model.lazy="arrString" placeholder="待入栈序列" allowempty></el-input>
          </el-form-item>
          <el-form-item label="操作序列:" label-width="80px">
              <el-input v-model.lazy="opArrString" placeholder="操作序列"></el-input>
          </el-form-item>
      </el-form>
      <!-- <el-form slot="add-dialog-div">
          <el-form-item label="数组:" label-width="60px">
              <el-input type="textarea" v-model="dataString" placeholder="数组"></el-input>
          </el-form-item>
      </el-form> -->
    </baseDiv>
  </div>
</template>
<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
import { MyQueue, OperateList, MyStackList } from '@/assets/js/myQueue'
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
          name: '自动出入队'
        }
      ],
      display: {
        add: true
      },
      base: {},
      canvas: {},
      context: {},
      queue: {},
      stack1: {},
      stack2: {},
      oplist: {},
      arr: [2, 4, 5, 1, 3, 1, 3],
      arrString: '2, 4, 5, 1, 3, 1, 3',
      opArr: [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      opArrString: '1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0',
      isAnimation: true,
      isMoveCursor: true,
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
    this.initCanvas()
    this.queue = new MyQueue(320, 200, 40, 100, 5, this.arr)
    this.stack1 = new MyStackList(100, 50, 200, 10, '入队列序列', this.arr, true)
    this.stack2 = new MyStackList(500, 50, 200, 10, '出队列序列', [], false)
    this.oplist = new OperateList(250, 250, 200, this.opArr, '操作序列:', 0)
    this.stack1.draw(this.context)
    this.stack2.draw(this.context)
    this.queue.draw(this.context)
    this.oplist.draw(this.context)
  },
  methods: {
    moveCursor () {
      let k = this.Player.line
      let i = this.Player.i
      const that = this.base
      const innerLoop = () => {
        if (that.isPlay && this.isMoveCursor && !this.isEnd && !(that.set.has(k))) {
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
          if (that.set.has(k)) {
            that.focus = k
            that.isPlay = false
          }
          if (this.isEnd) {
            this.Player.line = 0
            this.Player.i = 0
            this.isEnd = false
          } else {
            this.Player.line = k
            this.Player.i = i
          }
        }
      }
      innerLoop()
      if (!this.flage) {
        this.animation()
        this.flage = true
      }
    },
    changeDialog () {
      this.base.dialogVisible = false
      this.arr = this.getArray(this.arrString)
      this.opArr = this.getArray(this.opArrString)
      this.canvas.width += 0
      this.queue = new MyQueue(320, 200, 40, 100, 5, this.arr)
      this.stack1 = new MyStackList(100, 50, 200, 10, '入队列序列', this.arr, true)
      this.stack2 = new MyStackList(500, 50, 200, 10, '出队列序列', [], false)
      this.oplist = new OperateList(250, 250, 200, this.opArr, '操作序列:', 0)
      this.stack1.draw(this.context)
      this.stack2.draw(this.context)
      this.queue.draw(this.context)
      this.oplist.draw(this.context)
    },
    addDialog () {

    },
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
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
    animation () {
      const queue = this.queue
      const stack1 = this.stack1
      const stack2 = this.stack2
      const oplist = this.oplist
      let i = 0
      let flage = true
      let flage2 = true
      const myAnimation = () => {
        if (this.base.isPlay && this.isAnimation) {
          this.canvas.width += 0
          if (flage && oplist.data[i] === 1) {
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
          if (!stack1.animation && oplist.data[i] === 1) {
            flage = true
            i++
            oplist.index = i
            this.isMoveCursor = true
            if (flage2) {
              queue.enQueue(true)
              this.moveCursor()
            } else {
              flage2 = true
            }
          } else if (!stack2.animation && oplist.data[i] === 0) {
            flage = true
            i++
            oplist.index = i
            this.isMoveCursor = true
            if (flage2) {
              this.moveCursor()
            } else {
              flage2 = true
            }
          }
          stack1.draw(this.context)
          stack2.draw(this.context)
          queue.draw(this.context)
          oplist.draw(this.context)
        }
        if (i < oplist.data.length) {
          setTimeout(() => {
            myAnimation()
          }, this.base.getSpeed() / 2)
        } else {
          this.base.isPlay = false
          this.isEnd = true
          this.flage = false
          this.queue = new MyQueue(320, 200, 40, 100, 5, this.arr)
          this.stack1 = new MyStackList(100, 50, 200, 10, '入队列序列', this.arr, true)
          this.stack2 = new MyStackList(500, 50, 200, 10, '出队列序列', [], false)
          this.oplist = new OperateList(250, 250, 200, this.opArr, '操作序列:', 0)
        }
      }
      myAnimation()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
