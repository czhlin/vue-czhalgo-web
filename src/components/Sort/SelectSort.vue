<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <transition-group slot="animation-div" class="sort" name="list-complete" tag="p">
        <div
            v-for="(item,index) in sortList"
            :key="item.index"
            class="list-complete-item"
        >
          <div>{{ item.val }}</div>
          <div class="item-div"
               :class="{change:isChange(index),active:isActived(index),complate:isComplete(index)}"
               :style="{height:setHight(item.val)+'px'}"
          >
          </div>
        </div>
      </transition-group>
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
        `//选择排序
    private void sortSelect(int* a,int len)
    {
        int i,j,temp;
        for(i=0;i<len;i++)
        {
            for(j=0;j<len;j++)
            {
               if(a[i]>a[j]){
                   temp=a[i];
                   a[i]=a[j];
                   a[j]=temp;
               }
            }
        }
    }`,
        `//选择排序
    private void sortSelect(vector<int>& a)
    {
        int i,j,temp,len=a.size();
        for(i=0;i<len;i++)
        {
             for(j=0;j<len;j++)
            {
               if(a[i]>a[j]){
                   temp=a[i];
                   a[i]=a[j];
                   a[j]=temp;
               }
            }
        }
    }`,
        `//选择排序
    private void sortSelect(int[] a)
    {
        int i,j,temp,len=a.length;
        for(i=0;i<len;i++)
        {
             for(j=0;j<len;j++)
            {
               if(a[i]>a[j]){
                   temp=a[i];
                   a[i]=a[j];
                   a[j]=temp;
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
      base: {},
      dataString: '',
      datalist: [],
      sortList: [],
      actived: [],
      change: [],
      sorted: [],
      levelList: [
        {
          name: '排序'
        },
        {
          name: '选择排序'
        }
      ],
      isSort: true,
      isEnd: false,
      maxVal: 100,
      minVal: 1,
      Player: {
        min: 1,
        max: 100,
        len: 10,
        i: 0,
        j: 0,
        status: -1,
        line: 0,
        moveCursor: {
          i: 0,
          j: 0
        }
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
    this.initDataList(1, 100, 10)
    this.base.changeDataCode(2)
  },
  methods: {
    bubbleSort () {
      const len = this.sortList.length
      const that = this.base
      let i = this.Player.i; let j = this.Player.j
      const change = () => {
        if (that.isPlay && this.isSort) {
          if (this.sortList[i].val > this.sortList[j].val) { // 相邻元素两两对比
            this.change = [i, j]
            const tmp = this.sortList[i] // 元素交换
            this.$set(this.sortList, i, this.sortList[j])
            this.$set(this.sortList, j, tmp)
          }
          j++
          setTimeout(() => { innerLoop() }, that.getSpeed() + 100)
        } else {
          this.Player.i = i
          this.Player.j = j
          this.Player.status = 0
        }
      }
      const innerLoop = () => {
        if (this.change.length) {
          this.change.length = 0
        }
        if (that.isPlay && this.isSort) {
          if (j < len) {
            this.actived = [i, j]
            setTimeout(() => { change() }, that.getSpeed() + 100)
          } else {
            this.sorted.push(i)
            i++
            j = i + 1
            outLoop()
          }
        } else {
          this.Player.i = i
          this.Player.j = j
          this.Player.status = 1
        }
      }
      const outLoop = () => {
        if (i < len) {
          innerLoop()
        } else {
          this.isEnd = true
        }
      }
      switch (this.Player.status) {
        case 0:
          change()
          break
        case 1:
          innerLoop()
          break
        default:
          outLoop()
      }
    },
    moveCursor () {
      let k = this.Player.line
      const that = this.base
      const listLen = this.sortList.length
      let i = this.Player.moveCursor.i; let j = this.Player.moveCursor.j
      const innerLoop = () => {
        if (that.isPlay && !this.isEnd && !(that.set.has(k))) {
          if (k === 14) {
            i++
            j = i + 1
            k = 4
          } else if (k === 13) {
            j++
            k = 6
          } else if (k === 4 && i === listLen) {
            k = 15
          } else if (k === 6 && j === listLen) {
            k = 14
          } else if (k === 8 && this.sortList[i].val <= this.sortList[j].val) {
            k = 12
          } else k++
          if (k === 8 || k === 12 || k === 16) {
            this.isSort = true
            this.bubbleSort()
          } else {
            this.isSort = false
          }
          that.editor.setCursor(k, 0)
          setTimeout(() => { innerLoop() }, that.getSpeed())
        } else if (this.isEnd) {
          this.isPlay = false
          this.initDataList2()
        } else {
          that.isPlay = false
          that.focus = k
          this.Player.line = k
          this.Player.moveCursor.i = i
          this.Player.moveCursor.j = j
        }
      }
      innerLoop()
    },
    setHight (n) {
      return (n - this.minVal + 1) / (this.maxVal - this.minVal) * 100
    },
    isActived (index) {
      return this.actived.includes(index)
    },
    isComplete (index) {
      return this.sorted.includes(index)
    },
    isChange (index) {
      return this.change.includes(index)
    },
    clear () {
      const that = this.base
      that.isPlay = false
      this.datalist = []
      this.sortList = []
      this.actived = []
      this.change = []
      this.sorted = []
      this.isEnd = false
      setTimeout(() => {
        this.Player.i = 0
        this.Player.j = 0
        this.Player.status = -1
        this.Player.line = 0
        this.Player.moveCursor.i = 0
        this.Player.moveCursor.j = 0
      }, 800)
    },
    initSortList () {
      for (let i = 0; i < this.datalist.length; i++) {
        this.sortList.push({ index: i, val: this.datalist[i] })
      }
    },
    initDataList () {
      const that = this.base
      const n = this.Player.min
      const m = this.Player.max
      const len = this.Player.len
      this.minVal = n
      this.maxVal = m
      that.dialogVisible = false
      that.isPlay = false
      const res = []
      for (let i = 0; i < len; i++) {
        res.push(that.getRandom(m, n))
      }
      this.clear()
      this.datalist = res
      this.dataString = res.toString()
      setTimeout(() => { this.initSortList() }, 1000)
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
      setTimeout(() => { this.initSortList() }, 1000)
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
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#app .sort{
  top: 0;
  height: 100%;
  width: 600px;
  margin:100px auto;
  text-align: center;
}
#app .active {
  background-color: yellow;
  color: #fff;
}
#app .change {
  background-color: red;
  color: #fff;
}
#app .complate {
  background-color: green;
  color: #fff;
}
.item-div {
  display: inline-block;
  background-color: pink;
  width: 20px;
}
.list-complete-item {
  margin: 0 10px;
  top: 50%;
  display: inline-block;

  transition: transform 0.5s;
}
</style>
