<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <div id="animation">
          <span id="reminder"></span>
          <div id="number" :style="{left: position+'px'}">{{val}}</div>
          <div class="in">
            <div class='arr'  v-for="(item,index) in sortList" :key="index">
              {{item.val}}
            </div>
          </div>
        </div>
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
      </el-form>
      <el-form slot="add-dialog-div">
        <el-form-item label="数组" label-width="60px">
          <el-input type="textarea" v-model="dataString" placeholder="数组"></el-input>
        </el-form-item>
      </el-form>
    </baseDiv>
  </div>
</template>

<script>
import baseDiv from '@/components/utils/BaseDiv/Base'
export default {
  name: 'BinarySearch',
  components: {
    baseDiv
  },
  data () {
    return {
      codeDataList: [
        `//折半查找
 int binarySearch(int[] arr, int k) {
    int a = 0;
    int b = arr.length-1;
    while (a < b) {
       int m =a + (k - arr[a])/(arr[b] - arr[a]) * (b - a);
       System.out.println(m);
       if (k < arr[m]) {
           b = m;
       } else if (k > arr[m]) {
           a = m + 1;
       } else {
           return m;
       }
   }
   return -1;
}`,
        `//折半查找
 int binarySearch(int *arr, int k) {
    int a = 0;
    int b = arr.length-1;
    while (a < b) {
        int m =a + (k - arr[a])/(arr[b] - arr[a]) * (b - a);
        System.out.println(m);
        if (k < arr[m]) {
            b = m;
        } else if (k > arr[m]) {
            a = m + 1;
        } else {
            return m;
        }
    }
    return -1;
}`,
        `//折半查找
public static int binarySearch(int[] arr, int k) {
     int a = 0;
     int b = arr.length-1;
     while (a < b) {
         int m =a + (k - arr[a])/(arr[b] - arr[a]) * (b - a);
         System.out.println(m);
         if (k < arr[m]) {
             b = m;
         } else if (k > arr[m]) {
             a = m + 1;
         } else {
             return m;
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
          name: '查找'
        },
        {
          name: '插入查找'
        }
      ],
      base: {},
      position: 15,
      numIndex: 0,
      left: 0,
      right: 0,
      mid: -1,
      isRed: -1,
      isFind: false,
      isEnd: false,
      // 数组
      dataString: '',
      sortList: [],
      maxVal: 100,
      minVal: 1,
      Player: {
        min: 1,
        max: 100,
        len: 11,
        line: 0
      },
      // 查找的值
      val: 60
    }
  },
  mounted () {
    this.base = this.$refs.base
    this.base.moveCursor = this.moveCursor
    this.base.changeDialog = this.initDataList
    this.base.addDialog = this.initDataList2
    // this.initDataList(1, 100, 10)
    this.initDataList()
    this.base.changeDataCode(2)
  },
  methods: {
    moveCursor () {
      let t
      let k = this.Player.line
      const that = this.base
      const code = () => {
        if (that.isPlay && !(that.set.has(k))) {
          if (k === 4 && !this.isFind && !this.isEnd) {
            this.moveSort()
          } else if (k === 13 && !this.isFind && !this.isEnd) {
            k = 3
          } else if (k === 15 && this.isEnd && !this.isFind) {
            setTimeout(() => {
              document.getElementById('reminder').innerText = `没找到!
            return 0`
            }, 500)
            setTimeout(() => {
              this.end()
            }, 3000)
          }
          if (k === 4 && this.isEnd) {
            k = 13
          }
          k++
          console.log(that.editor)
          that.editor.setCursor(k, 0)
          this.Player.line = k
          clearTimeout(t)
          t = setTimeout(() => {
            code()
          }, that.getSpeed())
        }
        if (that.set.has(k)) {
          that.focus = k
          that.isPlay = false
        }
      }
      code()
    },
    moveSort () {
      const a = document.getElementsByClassName('arr')
      const that = this.base
      if (this.left > this.right) {
        this.isEnd = true
      } else {
        this.mid = Math.floor((this.left + this.right) / 2)
        setTimeout(() => {
          a[this.mid].className = 'arr red'
          this.changePosition()
        }, that.getSpeed())
        if (this.val === this.sortList[this.mid].val) {
          this.isFind = true
          setTimeout(() => {
            a[this.mid].className = 'arr red'
            document.getElementById('reminder').innerText = `找到了!
            return ${this.mid}`
          }, 1000)
          setTimeout(() => {
            this.end()
          }, 3000)
        } else if (this.val < this.sortList[this.mid].val) {
          this.right = this.mid - 1
          this.changeColor()
        } else if (this.val > this.sortList[this.mid].val) {
          this.left = this.mid + 1
          this.changeColor()
        }
      }
    },
    end () {
      this.base.isPlay = false
      setTimeout(() => {
        this.mid = -1
        this.isFind = false
        this.isEnd = false
        this.position = 15
        this.initDataList()
        this.right = this.sortList.length - 1
        this.left = 0
        document.getElementById('reminder').innerText = ''
        this.base.editor.setCursor(0, 0)
      }, 2000)
    },
    changeColor () {
      const a = document.getElementsByClassName('arr')
      const that = this.base
      for (let j = 0; j < this.sortList.length; j++) {
        a[j].className = 'arr yellow'
      }
      for (let j = this.left; j <= this.right; j++) {
        setTimeout(() => {
          a[j].className = 'arr bound'
        }, that.getSpeed() + 1000)
      }
    },
    changePosition () {
      this.position = 60 * this.mid + 15
    },
    clear () {
      const that = this.base
      that.isPlay = false
      this.datalist = []
      this.sortList = []
      this.isEnd = false
      setTimeout(() => {
        this.Player.line = 0
      }, 800)
    },
    initSortList () {
      for (let i = 0; i < this.datalist.length; i++) {
        this.sortList.push({ index: i, val: this.datalist[i] })
      }
      this.right = this.sortList.length - 1
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
      console.log(res)
      this.datalist = res.sort((a, b) => a - b)
      this.dataString = res.toString()
      console.log(this.datalist)
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

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.out {
  width: auto;
  height: 600px;
  background-color: #ebedee;
  overflow: hidden;
}
#animation {
  width: 700px;
  height: 400px;
  background-color: #ffffff;
  position: relative;
  text-align: center;
}
#reminder {
  position: relative;
  font-size: 34px;
  color: #fefefe;
  text-shadow:
    0 1px 0 #c0c0c0,
    0 2px 0 #b0b0b0,
    0 3px 0 #a0a0a0,
    0 4px 0 #909090,
    0 5px 10px rgba(0,0,0,9)
;
  top: 50px;
}
#number {
  position: absolute;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  bottom: 100px;
  color: #ebedee;
  /* background-color: rgb(228, 82, 37); */
  background: radial-gradient(at center, #f56767, #be0404);
  border-radius: 15px;
  transition: all 0.3s;
}
.in {
  position: absolute;
  display: flex;
  /* background-color: black; */
  justify-content: center;
  bottom: 50px;
}

.arr {
  width: 30px;
  height: 30px;
  color: #ebedee;
  /* background-color: rgb(40, 160, 104); */
  background: radial-gradient(at center, #8ce97a, #11af03);
  border-radius: 15px;
  margin: 0 15px;
  text-align: center;
  line-height: 30px;
}
.red {
  background: radial-gradient(at center, #f56767, #be0404);
}

.yellow {
  background:radial-gradient(at center, #545c64, #434c55);
}
.bound {
  animation: ball 0.3s 1 alternate-reverse;

}
@keyframes ball {
  to {
    transform: translateY(-15px);
  }
}

</style>
