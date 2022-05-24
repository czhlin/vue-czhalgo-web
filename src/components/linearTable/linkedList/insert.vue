<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <canvas id="canvas" width="870" height="340"></canvas>
        <span style="position: absolute;top:10px;left:10px;">插入目标{{Player.val}} 下标位置:{{Player.index}}</span>
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
          <el-form-item label="插入值:" label-width="80px">
              <el-input v-model.number="Player.val" placeholder="目标"></el-input>
          </el-form-item>
          <el-form-item label="插入位置:" label-width="80px">
              <el-input v-model.number="Player.index" placeholder="下标位置"></el-input>
          </el-form-item>
      </el-form>
       <el-form slot="add-dialog-div">
          <el-form-item label="数组:" label-width="60px">
              <el-input type="textarea" v-model="dataString" placeholder="数组不超过10个"></el-input>
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
        `//单链表插入
void insertNodeByIndex(int index, Node *node) {
  if (index < 1 || index > getNodeLength()) {
      return;
  }
  Node* temp = head;
  int length = 1;// 记录光标位置
  while (temp->next != null) {
    if (index == length) {// 找到要插入的位置,进行插入操作，
        node->next = temp->next;
        temp->next = node;
    } else {
        temp = temp->next;
    }
    length++;
  }
}`,
       `//单链表插入
void insertNodeByIndex(int index, struct Node* node) {
  if (index < 1 || index > getNodeLength()) {
      return;
  }
  Node* temp = head;
  int length = 1;// 记录光标位置
  while (temp->next != null) {
    if (index == length) {// 找到要插入的位置,进行插入操作，
        node->next = temp->next;
        temp->next = node;
    } else {
        temp = temp->next;
    }
    length++;
  }
}`,
        `//单链表插入
public void insertNodeByIndex(int index, Node node) {
  if (index < 1 || index > getNodeLength()) {
      return;
  }
  Node temp = head;
  int length = 1;// 记录光标位置
  while (temp.next != null) {
    if (index == length) {// 找到要插入的位置,进行插入操作，
        node.next = temp.next;
        temp.next = node;
    } else {
        temp = temp.next;
    }
    length++;
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
      let re
      let k = this.Player.line
      const that = this.base
      let n = 1
      const innerLoop = () => {
        if (that.isPlay && !this.isEnd && !(that.set.has(k))) {
          if (k === 2 && (this.Player.index < 0 || this.Player.index > this.datalist.length)) {
            this.isEnd = true
            alert('插入位置不正确')
            k = 0
          }
          if (k === 12) {
            this.change(n)
          }
          if (k === 15) {
            n++
            k = 6
          }
          if (k === 8 && this.Player.index === n) {
            this.drawInsert(this.Player.index - 1)
          } else if (k === 8 && this.Player.index !== n) {
            k = 11
          }
          if (k === 10 && this.Player.index === n) {
            this.isEnd = true
            k = 15
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
          re = this.datalist
          this.datalist.splice(n - 1, 0, this.Player.val)
          this.draw(this.datalist)
          this.datalist = re
          // setTimeout(() => {
          //   this.clear()
          // }, 10000)
        } else {
          that.focus = k
          that.isPlay = false
          this.Player.line = k
        }
      }
      innerLoop()
    },
    initDataList () {
      const that = this.base
      const n = this.Player.min
      const m = this.Player.max
      if (this.Player.len > 10) {
        alert('数组不大于10')
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
      this.draw(this.datalist)
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
      this.draw(this.datalist)
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
      // this.initDataList()
    },
    drawInsert (num) {
      const that = this.base
      if (num > 0 && num <= 5) {
        this.context.clearRect(num * 120 - 30, 90, 60, 40)
        this.context.translate(num * 120 - 30, 60)
        this.context.fillStyle = '#315a6e'
        this.context.fillRect(10, 5, 30, 25)
        this.context.fillStyle = '#a3d8e2'
        this.context.fillRect(40, 5, 10, 25)
        this.context.font = 'bold 15px Arial'
        this.context.fillStyle = '#f9f8f8'
        this.context.fillText(this.Player.val, 20, 20)
        setTimeout(() => {
          this.line(50, 20, 60, 50)
        }, that.getSpeed() - 500)
        setTimeout(() => {
          this.line(0, 50, 10, 20)
          this.context.translate(-(num * 120 - 30), -60)
        }, that.getSpeed())
      } else if (num > 5 && num < 10) {
        num = num - 5
        this.context.clearRect(num * 120 - 30, 170, 60, 40)
        this.context.translate(num * 120 - 30, 200)
        this.context.fillStyle = '#315a6e'
        this.context.fillRect(10, 5, 30, 25)
        this.context.fillStyle = '#a3d8e2'
        this.context.fillRect(40, 5, 10, 25)
        this.context.font = 'bold 15px Arial'
        this.context.fillStyle = '#f9f8f8'
        this.context.fillText(this.Player.val, 20, 20)
        setTimeout(() => {
          this.line(50, 20, 60, 0)
        }, that.getSpeed() - 500)
        setTimeout(() => {
          this.line(0, 0, 10, 20)
          this.context.translate(-(num * 120 - 30), -200)
        }, that.getSpeed())
      } else if (num === 0) {
        this.context.translate(30, 30)
        this.context.clearRect(0, 40, 60, 20)
        this.context.fillStyle = '#315a6e'
        this.context.fillRect(80, 10, 40, 30)
        this.context.fillStyle = '#a3d8e2'
        this.context.fillRect(80, 40, 40, 10)
        this.context.font = 'bold 15px Arial'
        this.context.fillStyle = '#f9f8f8'
        this.context.fillText(this.Player.val, 80, 10)
        setTimeout(() => {
          this.line(80, 50, 30, 60)
        }, that.getSpeed() - 500)
        setTimeout(() => {
          this.line(40, 20, 80, 20)
          this.context.translate(-30, -30)
        }, that.getSpeed())
      }
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
    },
    change (num) {
      this.draw(this.datalist)
      if (num <= 5) {
        this.context.fillStyle = '#648062'
        this.context.fillRect(num * 120 - 90, 90, 40, 40)
        this.context.font = 'bold 15px Arial'
        this.context.fillStyle = '#f9f8f8'
        this.context.fillText(this.datalist[num - 1], num * 120 - 80, 110)
      } else if (num > 5 && num <= 10) {
        num = num - 5
        this.context.fillStyle = '#648062'
        this.context.fillRect(num * 120 - 90, 180, 40, 40)
        this.context.font = 'bold 15px Arial'
        this.context.fillStyle = '#f9f8f8'
        this.context.fillText(this.datalist[num + 4], num * 120 - 80, 200)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
