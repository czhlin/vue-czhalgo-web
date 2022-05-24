<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList" :display="display">
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
import { MyStack, OperateList, MyStackList } from '@/assets/js/myStack'
export default {
  data () {
    return {
      codeDataList: [
        `//入栈
void push(Object *x){
    if(top==stackElemLen){
        return;
    }
    else{
        stackElem[top++]=x;
    }
}
//出栈
Object* pop(){
    if(top==0){
         return;
    }
    else{
        return stackElem[--top];  //删除然后返回现在的栈顶
    }
}`,
        `//入栈
void push(Object x) throws Exception{
    if(top==stackElem.length){
        throw new Exception("栈已满！");
    }
    else{
        stackElem[top++]=x;
    }
}
//出栈
Object pop() throws Exception{
    if(top==0){
        throw new Exception("栈为空！");
    }
    else{
        return stackElem[--top];  //删除然后返回现在的栈顶
    }
}`,
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
          name: '自动出入栈'
        }
      ],
      display: {
        add: true
      },
      base: {},
      canvas: {},
      context: {},
      stack: {},
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
    this.stack = new MyStack(320, 200, 40, 100, 5, this.arr)
    this.stack1 = new MyStackList(100, 50, 200, 10, '入栈序列', this.arr, true)
    this.stack2 = new MyStackList(500, 50, 200, 10, '出栈序列', [], false)
    this.oplist = new OperateList(250, 250, 200, this.opArr, '操作序列:', 0)
    this.stack1.draw(this.context)
    this.stack2.draw(this.context)
    this.stack.draw(this.context)
    this.oplist.draw(this.context)
  },
  methods: {
    moveCursor () {
      let k = this.Player.line
      let i = this.Player.i
      const that = this.base
      console.log(that.focus)
      const innerLoop = () => {
        if (that.isPlay && this.isMoveCursor && !this.isEnd && !(that.set.has(k))) {
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
      this.stack = new MyStack(320, 200, 40, 100, 5, this.arr)
      this.stack1 = new MyStackList(100, 50, 200, 10, '入栈序列', this.arr, true)
      this.stack2 = new MyStackList(500, 50, 200, 10, '出栈序列', [], false)
      this.oplist = new OperateList(250, 250, 200, this.opArr, '操作序列:', 0)
      this.stack1.draw(this.context)
      this.stack2.draw(this.context)
      this.stack.draw(this.context)
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
      const stack = this.stack
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
          if (!stack1.animation && oplist.data[i] === 1) {
            stack.push(true)
            flage = true
            i++
            oplist.index = i
            this.isMoveCursor = true
            this.isAnimation = false
            if (flage2) {
              this.moveCursor()
            } else {
              flage2 = true
            }
          } else if (!stack2.animation && oplist.data[i] === 0) {
            flage = true
            i++
            oplist.index = i
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
          oplist.draw(this.context)
        }
        if (i < oplist.data.length) {
          setTimeout(() => {
            myAnimation()
          }, this.base.getSpeed() / 5)
        } else {
          this.base.isPlay = false
          this.isEnd = true
          this.flage = false
          this.stack = new MyStack(320, 200, 40, 100, 5, this.arr)
          this.stack1 = new MyStackList(100, 50, 200, 10, '入栈序列', this.arr, true)
          this.stack2 = new MyStackList(500, 50, 200, 10, '出栈序列', [], false)
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
