<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <canvas id="canvas" width="600" height="300"></canvas>
        <span style="position: absolute;top:10px;left:10px;">查找目标{{Player.val}}</span>
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
          <el-form-item label="查找值:" label-width="80px">
              <el-input v-model.number="Player.val" placeholder="目标"></el-input>
          </el-form-item>
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
import { MyArray, drawArrow } from '@/assets/js/myArray'
import baseDiv from '@/components/utils/BaseDiv/Base'
export default {
  data () {
    return {
      codeDataList: [
        `//线性表查找
public void insert(int* arr,int len,int val){
 for(int i=0;i<len;i++)
  {
    if(arr[i]==val){
      return i;
    }

  }
  return -1;
}`,
       `//线性表查找
public void insert(vector<int>& arr,int val){
 for(int i=0;i<arr.size();i++)
  {
    if(arr[i]==val){
      return i;
    }

  }
  return -1;
}`,
        `//线性表查找
public void search(int[] arr,int val){
  for(int i=0;i<arr.length;i++)
  {
    if(arr[i]==val){
      return i;
    }

  }
  return -1;
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
          name: '线性表'
        },
        {
          name: '顺序表'
        },
        {
          name: '查找'
        }
      ],
      base: {},
      canvas: {},
      context: {},
      myArray: {},
      dataList: [],
      dataString: '',
      isDraw: true,
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
        status: { fun: -1, i: -1 },
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
      const val = this.Player.val
      let i = this.Player.status.i === -1 ? 0 : this.Player.status.i
      const innerLoop = () => {
        if (that.isPlay && !this.isEnd && !(that.set.has(k))) {
          if (k === 2 && i === this.Player.len) {
            k = 9
          } else if (k === 8) {
            i++
            k = 2
          } else if (k === 4) {
            if (this.myArray.drawItems[i].value === val) {
              k = 5
            } else {
              k = 6
            }
          } else if (k === 5) {
            k = 10
          } else k++
          if (k === 4 || k === 7 || k === 10) {
            this.isDraw = true
            this.drawSearch()
          } else {
            this.isDraw = false
          }
          that.editor.setCursor(k, 0)
          setTimeout(() => { innerLoop() }, that.getSpeed())
        } else if (this.isEnd) {
          that.isPlay = false
          this.clear()
          this.myArray.setArr(this.myArray.arr)
        } else {
          that.isPlay = false
          this.Player.line = k
          this.Player.status.i = i
          that.focus = k
        }
      }
      innerLoop()
    },
    initDataList () {
      const that = this.base
      const n = this.Player.min
      const m = this.Player.max
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
      this.myArray.setArr(res)
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.myArray.draw(this.context)
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
      this.myArray.setArr(this.datalist)
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.myArray.draw(this.context)
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
      this.tooltip = document.getElementById('tooltip')
      this.context = this.canvas.getContext('2d')
      this.myArray = new MyArray(this.canvas.width / 4, this.canvas.height / 2, 40, 20, this.dataList)
    },
    clear () {
      this.isDraw = false
      this.isEnd = false
      this.Player.status.fun = -1
      this.Player.status.i = -1
      this.Player.line = 0
    },
    drawSearch () {
      const { drawItems, offset } = this.myArray
      const context = this.context
      const val = this.Player.val
      const base = this.base
      const active = (i) => {
        if (base.isPlay && this.isDraw) {
          drawItems[i].color = 'red'
          drawItems[i].draw(context)
          drawArrow(context, drawItems[i].x + offset / 2, drawItems[i].y, 'red')
          setTimeout(() => { change(i) }, base.getSpeed() + 100)
        } else {
          this.Player.status = { fun: 0, i }
        }
      }
      const change = (i) => {
        if (base.isPlay && this.isDraw) {
          context.clearRect(drawItems[i].x, drawItems[i].y - 30, offset, 29)
          drawItems[i].color = 'green'
          drawItems[i].draw(context)
          if (drawItems[i].value !== val) {
            setTimeout(() => { innerLoop(i + 1) }, base.getSpeed() + 100)
          } else {
            this.$message.success('找到了,下标为' + i)
          }
        } else {
          this.Player.status = { fun: 1, i }
        }
      }
      const innerLoop = (i) => {
        if (i < this.Player.len) {
          active(i)
        } else {
          this.$message.error('抱歉没有找到！！！')
          this.isEnd = true
        }
      }
      const status = this.Player.status
      if (status.i === this.Player.len) {
        return
      }
      switch (status.fun) {
        case 0:
          active(status.i)
          break
        case 1:
          change(status.i)
          break
        default:
          this.myArray.draw(context)
          innerLoop(0)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
