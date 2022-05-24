<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <canvas id="canvas" width="870" height="340"></canvas>
<!--        <span style="position: absolute;top:10px;left:10px;">插入目标{{Player.val}} 下标位置:{{Player.index}}</span>-->
      </div>
      <el-form slot="change-dialog-div">
          <el-form-item label="链表个数:" label-width="80px">
              <el-input v-model.number="Player.len" placeholder="数组长度"></el-input>
          </el-form-item>
          <el-form-item label="最小值:" label-width="80px">
              <el-input v-model.number="Player.min" placeholder="最小数"></el-input>
          </el-form-item>
          <el-form-item label="最大值:" label-width="80px">
              <el-input v-model.number="Player.max" placeholder="最大数"></el-input>
          </el-form-item>
<!--          <el-form-item label="插入值:" label-width="80px">-->
<!--              <el-input v-model.number="Player.val" placeholder="目标"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="插入位置:" label-width="80px">-->
<!--              <el-input v-model.number="Player.index" placeholder="下标位置"></el-input>-->
<!--          </el-form-item>-->
      </el-form>
       <el-form slot="add-dialog-div">
          <el-form-item label="数组:" label-width="60px">
              <el-input type="textarea" v-model="dataString" placeholder="数组"></el-input>
          </el-form-item>
      </el-form>
    </baseDiv>
  </div>
</template>
<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
export default {
  data () {
    return {
      codeDataList: [
        `//单链表创建
void Create(int* nums){

    Node* temp = head;
    int b = sizeof(arr) / sizeof(arr[0]) - 1;
    for (int i = 0; i < b; i++) {
        Node newNode=(Node*)malloc(sizeof(Node));//创建新的结点
        newNode->data=i;//设置数据域
        newNode->next=null;
        temp->next=newNode;
    }

}`,
        `//单链表创建
void Create(int* nums){

    Node* temp = head;
    int b = sizeof(arr) / sizeof(arr[0]) - 1;
    for (int i = 0; i < b; i++) {
        Node newNode=(Node*)malloc(sizeof(Node));//创建新的结点
        newNode->data=i;//设置数据域
        newNode->next=null;
        temp->next=newNode;
    }

}`,
        `//单链表创建
public void Create(int[] nums){

    Node temp = head;

    for (int i = 0; i < nums.length; i++) {
        Node newNode=new Node();//创建新的结点
        newNode.data=i;//设置数据域
        newNode.next=null;
        temp.next=newNode;
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
        '更改链表',
        '输入数据'
      ],
      levelList: [
        {
          name: '线性表'
        },
        {
          name: '单链表'
        },
        {
          name: '插入'
        }
      ],
      h: 0,
      j: 0,
      n: 0,
      h2: 0,
      j2: 0,
      n2: 0,
      base: {},
      canvas: {},
      context: {},
      dataList: [],
      dataString: '',
      // isDraw: true,
      isEnd: false,
      minVal: 2,
      maxVal: 100,
      len: 10,
      Player: {
        val: 8,
        index: 2,
        min: 1,
        max: 100,
        len: 10,
        line: 0
      }
    }
  },
  components: {
    baseDiv
  },
  mounted () {
    this.base = this.$refs.base
    this.base.moveCursor = this.moveCursor
    this.base.changeDialog = this.initDataList
    this.base.addDialog = this.initDataList2
    this.initCanvas()
    this.initDataList()
    this.base.changeDataCode(2)
  },
  methods: {
    moveCursor () {
      let k = this.Player.line
      const that = this.base
      const innerLoop = () => {
        if (that.isPlay && !this.isEnd && !(that.set.has(k))) {
          if (k === 3) {
            this.node(12, 30, 'top')
          }
          if (k === 10 && this.n2 < this.datalist.length) {
            k = 4
          }
          if (k === 5) {
            this.drawNode()
          }
          if (k === 9 && this.n2 === 1) {
            this.line(60, 70, 60, 90)
          }
          if (k === 9 && this.n2 > 1) {
            this.drawLine()
          }
          if (k === 12) {
            this.isEnd = true
          }
          k++
          that.editor.setCursor(k, 0)
          clearTimeout(innerLoop)
          setTimeout(() => {
            innerLoop()
          }, that.getSpeed())
        } else if (this.isEnd && k !== 1) {
          that.isPlay = false
          this.clear()
          this.draw(this.datalist)
        } else {
          that.isPlay = false
          this.Player.line = k
          that.focus = k
        }
      }
      innerLoop()
    },
    initDataList () {
      const that = this.base
      const n = this.Player.min
      const m = this.Player.max
      if (this.Player.len > 15) {
        alert('数组不大于15')
        this.Player.len = 10
      }
      const len = this.Player.len
      that.dialogVisible = false
      if (this.minVal === n && this.maxVal === m && this.len === len) {
        return
      }
      this.minVal = n
      this.maxVal = m
      that.isPlay = false
      const res = []
      for (let i = 0; i < len; i++) {
        res.push(that.getRandom(m, n))
      }
      this.clear()
      this.datalist = res
      this.dataString = res.toString()
      console.log(this.datalist)
      // this.node(30, 30, 'top')
      // this.line(60, 70, 60, 90)
    },
    initDataList2 () {
      const that = this.base
      that.inputDialogVisible = false
      that.isPlay = false
      this.clear()
      this.datalist = this.getArray(this.dataString)
      this.Player.len = this.datalist.length
      this.minVal = Math.min(...this.datalist)
      this.maxVal = Math.max(...this.datalist)
      // this.node(30, 30, 'top')
      // this.line(60, 70, 60, 90)
    },
    getArray (str) {
      str = str.replace(/(\[|\])/g, '')
      const arr1 = str.split(' ')
      const arr2 = str.split(',')
      const array = arr1.length > arr2.length ? arr1 : arr2
      const res = []
      for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i])) {
          res.push(Number(array[i]))
        }
      }
      return res
    },
    initCanvas () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
    },
    clear () {
      // this.isDraw = false
      this.isEnd = false
      this.Player.line = 0
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.n = 0
      this.h = 0
      this.j = 0
      this.n2 = 0
      this.h2 = 0
      this.j2 = 0
      // this.initDataList()
    },
    node (x, y, text) {
      this.context.fillStyle = '#2d2d2d'
      this.context.fillRect(x, y, 60, 40)
      this.context.font = 'bold 15px Arial'
      this.context.fillStyle = '#f9f8f8'
      this.context.fillText(text, x + 5, y + 20)
      this.context.fillStyle = '#f0a8a8'
      this.context.fillRect(x + 40, y, 20, 40)
    },
    line (x, y, x1, y2) {
      this.context.fillStyle = '#080808'
      this.context.beginPath()
      this.context.moveTo(x, y)
      this.context.lineTo(x1, y2)
      this.context.stroke()
    },
    drawNode () {
      // const that = this.base
      this.n2++
      this.node(30 + this.j2 * 120, 90 + this.h2 * 90, this.datalist[this.n2 - 1])
      this.j2++
      if ((this.n2 % 5) === 0) {
        this.h2++
        this.j2 = 0
      }
    },
    drawLine () {
      if (this.n !== this.datalist.length - 1) {
        this.line(90 + this.j * 120, 110 + this.h * 90, 150 + this.j * 120, 110 + this.h * 90)
      }
      this.j++
      if ((this.n + 1) % 5 === 0 && this.n + 1 !== this.datalist.length) {
        this.h++
        this.line(150 + (this.j - 1) * 120, 20 + this.h * 90, 150 + (this.j - 1) * 120, 60 + this.h * 90)
        this.line(150 + (this.j - 1) * 120, 60 + this.h * 90, 60, 60 + this.h * 90)
        this.line(60, 60 + this.h * 90, 60, 90 + this.h * 90)
        this.j = 0
      }
      this.n++
    },
    draw (dataList) {
      this.node(12, 30, 'top')
      this.line(60, 70, 60, 90)
      let h = 0
      let j = 0
      for (let n = 0; n < dataList.length; n++) {
        this.node(30 + j * 120, 90 + h * 90, dataList[n])
        if (n !== dataList.length - 1) {
          this.line(90 + j * 120, 110 + h * 90, 150 + j * 120, 110 + h * 90)
        }
        j++
        if ((n + 1) % 5 === 0 && n + 1 !== dataList.length) {
          h++
          this.line(150 + (j - 1) * 120, 20 + h * 90, 150 + (j - 1) * 120, 60 + h * 90)
          this.line(150 + (j - 1) * 120, 60 + h * 90, 60, 60 + h * 90)
          this.line(60, 60 + h * 90, 60, 90 + h * 90)
          j = 0
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
