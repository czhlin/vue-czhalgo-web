<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <canvas id="canvas" width="600" height="300"></canvas>
        <span style="position: absolute;top:10px;left:10px;">插入目标{{Player.val}} 下标位置:{{Player.index}}</span>
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
          <el-form-item label="插入值:" label-width="80px">
              <el-input v-model.number="Player.val" placeholder="目标"></el-input>
          </el-form-item>
          <el-form-item label="插入位置:" label-width="80px">
              <el-input v-model.number="Player.index" placeholder="下标位置"></el-input>
          </el-form-item>
      </el-form>
       <el-form slot="add-dialog-div">
          <el-form-item label="数组:" label-width="60px">
              <el-input type="textarea" v-model="dataString1" placeholder="数组"></el-input>
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
        `//线性表合并
public static int[] merge(int* arr1,int len1,int* arr2,int len2){
    int *res=(int*)calloc(len1+len2,sizeof(int));
    int i=0,j=0,k=0;
    while(i<len1||j<len2){
        if(j==len2||i<len1&&arr1[i]<=arr2[j]){
            res[k++]=arr1[i++];
        }else{
            res[k++]=arr2[j++];
        }
    }
    return res;
}`,
       `//线性表合并
public static int[] merge(vector<int>& arr1,vector<int>& arr2){
    vector<int>& res(arr1.size()+arr2.size());
    int i=0,j=0,k=0;
    while(i<arr1.size()||j<arr2.size()){
        if(j==arr2.size()||i<arr1.size()&&arr1[i]<=arr2[j]){
            res[k++]=arr1[i++];
        }else{
            res[k++]=arr2[j++];
        }
    }
    return res;
}`,
        `//线性表合并
public static int[] merge(int[] arr1,int[] arr2){
    int[] res=new int[arr1.length+arr2.length];
    int i=0,j=0,k=0;
    while(i<arr1.length||j<arr2.length){
        if(j==arr2.length||i<arr1.length&&arr1[i]<=arr2[j]){
            res[k++]=arr1[i++];
        }else{
            res[k++]=arr2[j++];
        }
    }
    return res;
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
          name: '合并'
        }
      ],
      base: {},
      canvas: {},
      context: {},
      arr1: {},
      arr2: {},
      arr3: {},
      dataList1: [],
      dataList2: [],
      dataString1: '',
      dataString2: '',
      isMoveCursor: true,
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
        len1: 5,
        len2: 5,
        status: { fun: -1, i: 0, j: 0 },
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
      let i = this.Player.status.i
      let j = this.Player.status.j
      const len1 = this.Player.len1
      const len2 = this.Player.len2
      const drawItems1 = this.arr1.drawItems
      const drawItems2 = this.arr2.drawItems
      const innerLoop = () => {
        if (that.isPlay && this.isMoveCursor && !this.isEnd && !(that.set.has(k))) {
          if (k === 4 && i === len1 && j === len2) {
            k = 11
          } else if (k === 10) {
            k = 4
          } else if (k === 5 && (j === len2 || (i < len1 && drawItems1[i].value <= drawItems2[j].value))) {
            k = 6
          } else if (k === 5) {
            k = 7
          } else if (k === 6) {
            i++
            k = 9
          } else if (k === 8) {
            j++
            k++
          } else k++
          if (k === 6 || k === 8) {
            this.isDraw = true
            this.drawMerge()
          } else {
            this.isDraw = false
          }
          that.editor.setCursor(k, 0)
          setTimeout(() => { innerLoop() }, that.getSpeed())
        } else if (this.isEnd) {
          this.initDataList2()
        } else {
          that.focus = k
          this.Player.line = k
          this.Player.status.i = i
          this.Player.status.j = j
        }
      }
      innerLoop()
      // this.isDraw = true
      // this.drawMerge()
    },
    initDataList () {
      const that = this.base
      const n = this.Player.min
      const m = this.Player.max
      const len1 = this.Player.len1
      const len2 = this.Player.len2
      that.dialogVisible = false
      if (this.minVal === n && this.maxVal === m && this.len === len1) {
        return
      }
      this.minVal = n
      this.maxVal = m
      that.isPlay = false
      const res1 = []
      const res2 = []
      for (let i = 0; i < len1; i++) {
        res1.push(that.getRandom(m, n))
      }
      for (let i = 0; i < len2; i++) {
        res2.push(that.getRandom(m, n))
      }
      this.clear()
      res1.sort((a, b) => a - b)
      res2.sort((a, b) => a - b)
      this.datalist1 = res1
      this.dataString1 = res1.toString()
      this.datalist2 = res2
      this.dataString2 = res2.toString()
      this.arr1.setArr(res1)
      this.arr2.setArr(res2)
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.arr1.draw(this.context)
      this.arr2.draw(this.context)
    },
    initDataList2 () {
      const that = this.base
      that.inputDialogVisible = false
      that.isPlay = false
      this.clear()
      this.datalist1 = this.getArray(this.dataString1)
      this.dataList2 = JSON.parse(JSON.stringify(this.getArray(this.dataString2)))
      this.Player.len1 = this.datalist1.length
      this.Player.len2 = this.datalist2.length
      this.minVal = Math.min(...this.datalist1)
      this.maxVal = Math.max(...this.datalist1)

      this.arr1.setArr(this.datalist1)
      this.arr2.setArr(this.dataList2)
      // console.log(this.dataList2, this.arr2)
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.arr1.draw(this.context)
      this.arr2.draw(this.context)
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
      this.arr1 = new MyArray(this.canvas.width / 4, this.canvas.height / 4, 40, 20, this.dataList1)
      this.arr2 = new MyArray(this.canvas.width / 4, this.canvas.height / 4 + 70, 40, 20, this.dataList2)
      this.arr3 = new MyArray(0, this.canvas.height / 4 + 140, 40, 20, [])
    },
    clear () {
      this.isDraw = false
      this.isEnd = false
      this.Player.status.fun = -1
      this.Player.status.i = 0
      this.Player.status.j = 0
      this.Player.line = 0
    },
    drawMerge () {
      const { drawItems: drawItems1, offset } = this.arr1
      const { drawItems: drawItems2 } = this.arr2
      const { drawItems: drawItems3 } = this.arr3
      const context = this.context
      const base = this.base
      const active = (i, j, k, flage) => {
        if (base.isPlay && this.isDraw) {
          this.isMoveCursor = false
          if (j === drawItems2.length || (i < drawItems1.length && drawItems1[i].value <= drawItems2[j].value)) {
            if (j < drawItems2.length) {
              drawItems2[j].color = 'yellow'
              drawItems2[j].draw(context)
            }
            drawItems1[i].color = 'red'
            drawItems1[i].draw(context)
            drawArrow(context, drawItems1[i].x + offset / 2, drawItems1[i].y, 'red')
            flage = true
          } else {
            if (i < drawItems1.length) {
              drawItems1[i].color = 'yellow'
              drawItems1[i].draw(context)
            }
            drawItems2[j].color = 'red'
            drawItems2[j].draw(context)
            drawArrow(context, drawItems2[j].x + offset / 2, drawItems2[j].y, 'red')
            flage = false
          }
          setTimeout(() => { change(i, j, k, flage) }, base.getSpeed() + 100)
        } else {
          this.Player.status = { fun: 0, i, j, k, flage }
        }
      }
      const change = (i, j, k, flage) => {
        if (base.isPlay && this.isDraw) {
          this.isMoveCursor = false
          if (flage) {
            this.arr3.add(drawItems1[i].value)
            drawItems1[i].color = 'blue'
            drawItems1[i].draw(context)
          } else {
            this.arr3.add(drawItems2[j].value)
            drawItems2[j].color = 'blue'
            drawItems2[j].draw(context)
          }
          drawItems3[k].color = 'green'
          drawItems3[k].draw(context)
          drawArrow(context, drawItems3[k].x + offset / 2, drawItems3[k].y, 'green')
          setTimeout(() => { recovery(i, j, k, flage) }, base.getSpeed() + 100)
        } else {
          this.Player.status = { fun: 1, i, j, k, flage }
        }
      }
      const recovery = (i, j, k, flage) => {
        if (base.isPlay && this.isDraw) {
          if (flage) {
            drawItems1[i].color = 'green'
            drawItems1[i].draw(context)
            context.clearRect(drawItems1[i].x, drawItems1[i].y - 30, offset, 29)
            i++
          } else {
            drawItems2[j].color = 'green'
            drawItems2[j].draw(context)
            context.clearRect(drawItems2[j].x, drawItems2[j].y - 30, offset, 29)
            j++
          }
          context.clearRect(drawItems3[k].x, drawItems3[k].y - 30, offset, 29)
          this.isMoveCursor = true
          this.moveCursor()
          setTimeout(() => { innerLoop(i, j, k + 1, flage) }, base.getSpeed() + 100)
        } else {
          this.Player.status = { fun: 2, i, j, k, flage }
        }
      }
      const innerLoop = (i, j, k, flage) => {
        if (i < drawItems1.length || j < drawItems2.length) {
          active(i, j, k, flage)
        } else {
          // drawArrow(context, drawItems[index].x + offset / 2, drawItems[index].y, 'blue')
          // drawItems[index].value = val
          // drawItems[index].color = 'blue'
          // drawItems[index].draw(context)
          this.isEnd = true
        }
      }
      const status = this.Player.status
      switch (status.fun) {
        case 0:
          active(status.i, status.j, status.k, status.flage)
          break
        case 1:
          change(status.i, status.j, status.k, status.flage)
          break
        case 2:
          recovery(status.i, status.j, status.k, status.flage)
          break
        default:
          this.arr1.draw(context)
          this.arr2.draw(context)
          innerLoop(0, 0, 0, true)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
