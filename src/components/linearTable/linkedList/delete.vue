<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <canvas id="canvas" width="800" height="340"></canvas>
        <span style="text-align: center; display:block;">删除下标位置:{{Player.index}}</span>
      </div>
      <el-form slot="change-dialog-div">
          <el-form-item label="数组个数:" label-width="80px">
              <el-input v-model.number="Player.len" placeholder="数组长度"></el-input>
          </el-form-item>
          <el-form-item label="最小值:" label-width="80px">
              <el-input v-model.number="Player.min" placeholder="最小数"></el-input>
          </el-form-item>
          <el-form-item label="最大值:" label-width="80px">
              <el-input v-model.number="Player.max" placeholder="最大数"></el-input>
          </el-form-item>
          <el-form-item label="删除位置:" label-width="80px">
              <el-input v-model.number="Player.index" placeholder="下标位置" :disabled="base.isPlay "></el-input>
          </el-form-item>
      </el-form>
       <el-form slot="add-dialog-div">
          <el-form-item label="数组:" label-width="60px">
              <el-input type="textarea" v-model="dataString" placeholder="数组"></el-input>
          </el-form-item>
         <el-form-item label="删除位置:" label-width="80px">
           <el-input v-model.number="Player.index" placeholder="下标位置" :disabled="base.isPlay "></el-input>
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
        `//单链表删除
void removeNode(Node* head, int index) {
    if (index == 0 || head == null) {
        return ;
    }
    Node* preNode = head,curNode = head->next;
    int count = 1;
    while (curNode != null) {
        if (count == index) {
            preNode->next = curNode->next;
            break;
        }
        count++;
        preNode = preNode->next;
        curNode = curNode->next;
    }
    return ;
}`,
        `//单链表删除
void removeNode(struct Node* head, int index) {
    if (index == 0 || head == null) {
        return ;
    }
    struct Node* preNode = head,curNode = head->next;
    int count = 1;
    while (curNode != null) {
        if (count == index) {
            preNode->next = curNode->next;
            break;
        }
        count++;
        preNode = preNode->next;
        curNode = curNode->next;
    }
    return ;
}`,
        `//单链表删除
public static void removeNode(Node head, int index) {
    if (index == 0 || head == null) {
        return ;
    }
    Node preNode = head,curNode = head.next;
    int count = 1;
    while (curNode != null) {
        if (count == index) {
            preNode.next = curNode.next;
            break;
        }
        count++;
        preNode = preNode.next;
        curNode = curNode.next;
    }
    return ;
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
      isEnd: false,
      index: 1,
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
          if (k === 7) {
            this.change(this.index)
          }
          if (k === 8 && this.Player.index === this.index) {
            this.isEnd = true
            setTimeout(() => {
              this.del(this.index)
            }, that.getSpeed() + 500)
            if (this.Player.len !== this.index) {
              setTimeout(() => {
                this.del2(this.index)
              }, that.getSpeed(0) + 2000)
            }
            // setTimeout(() => {
            //   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            //   this.datalist.splice(this.index - 1, 1)
            //   this.draw(this.datalist)
            // }, that.getSpeed() + 4000)
            that.editor.setCursor(10, 0)
          } else if (k === 8 && this.Player.index !== this.index) {
            k = 11
          }
          if (k === 15 && this.index < this.Player.len) {
            k = 6
            this.index++
          }
          if (k === 16) {
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
          that.editor.setCursor(16, 0)
          setTimeout(() => {
            this.clear()
            this.datalist.splice(this.Player.index - 1, 1)
            this.draw(this.datalist)
          }, 5000)
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
      this.isEnd = false
      this.Player.line = 0
      this.index = 1
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
      } else if (num > 10 && num <= 15) {
        num = num - 10
        this.context.fillStyle = '#648062'
        this.context.fillRect(num * 120 - 90, 270, 40, 40)
        this.context.font = 'bold 15px Arial'
        this.context.fillStyle = '#f9f8f8'
        this.context.fillText(this.datalist[num + 9], num * 120 - 80, 290)
      }
    },
    del (num) {
      if (num === 1) {
        this.context.clearRect(30, 70, 60, 20)
      } else if (num > 1 && num < 5) {
        this.context.clearRect(num * 120 - 150, 90, 60, 40)
      } else if (num % 5 === 0) {
        if (num === 5) {
          this.context.clearRect(num * 120 - 150, 90, 60, 40)
        } else if (num === 10) {
          this.context.clearRect((num - 5) * 120 - 150, 180, 60, 40)
        } else if (num === 15) {
          this.context.clearRect((num - 10) * 120 - 150, 250, 60, 40)
        }
      } else if (num > 6 && num < 9) {
        num = num - 5
        this.context.clearRect(num * 120 - 150, 170, 60, 40)
      } else if (num > 11 && num < 15) {
        num = num - 10
        this.context.clearRect(num * 120 - 150, 260, 60, 40)
      } else if (num === 6 && num !== this.Player.len) {
        this.context.clearRect(30, 130, 610, 50)
        this.context.clearRect(570, 90, 70, 40)
      } else if (num === 11 && num !== this.Player.len) {
        this.context.clearRect(30, 230, 640, 40)
        this.context.clearRect(570, 170, 70, 60)
      } else if (num === this.Player.len) {
        this.context.clearRect((num - 10) * 120 - 150, 250, 60, 40)
      }
    },
    del2 (num) {
      if (num === 1) {
        this.line(72, 50, 160, 50)
        this.line(160, 50, 160, 90)
      } else if (num > 1 && num < 5) {
        this.line(80 + (num - 2) * 120, 90, 80 + (num - 2) * 120, 80)
        this.line(80 + (num - 2) * 120, 80, 50 + num * 120, 80)
        this.line(50 + num * 120, 80, 50 + num * 120, 90)
      } else if (num % 5 === 0) {
        if (num === 5) {
          this.line(num * 120 - 160, 130, 60, 180)
        } else if (num === 10) {
          this.line((num - 5) * 120 - 160, 220, 60, 270)
        }
      } else if (num > 6 && num < 9) {
        num = num - 5
        this.line(80 + (num - 2) * 120, 100 + 80, 80 + (num - 2) * 120, 80 + 80)
        this.line(80 + (num - 2) * 120, 80 + 80, 50 + num * 120, 80 + 80)
        this.line(50 + num * 120, 80 + 80, 50 + num * 120, 100 + 80)
      } else if (num > 11 && num < 15) {
        num = num - 10
        this.line(80 + (num - 2) * 120, 110 + 160, 80 + (num - 2) * 120, 90 + 160)
        this.line(80 + (num - 2) * 120, 90 + 160, 50 + num * 120, 90 + 160)
        this.line(50 + num * 120, 90 + 160, 50 + num * 120, 110 + 160)
      } else if (num === 6) {
        this.line(560, 130, 560, 145)
        this.line(560, 145, 170, 145)
        this.line(170, 145, 170, 180)
      } else if (num === 11) {
        this.line(560, 220, 560, 235)
        this.line(560, 235, 170, 235)
        this.line(170, 235, 170, 270)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
