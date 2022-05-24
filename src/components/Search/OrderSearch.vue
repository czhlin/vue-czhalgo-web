<template>
  <div>
    <baseDiv ref="base" :codeDataList="codeDataList" :option="option" :title="title" :levelList="levelList">
      <div slot="animation-div">
        <div id="animation">
            <span id="reminder"></span>
            <div id="number" :style="{left: position+'px'}">{{val}}</div>
            <div class="in">
              <div class='arr' :class="{yellow: isChange[index] === 1,red: isRed === index}" v-for="(item,index) in sortList" :key="index">
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
        '//顺序查找\n' +
        'int SeqSearch(int s[],int n,int key){\n' +
        '    int i;\n' +
        '    for(i=0;i<n&&s[i]!=key;i++);\n' +
        '    if(i<n)\n' +
        '        return i;\n' +
        '    else\n' +
        '        return -1;\n' +
        '}\n',
        '//顺序查找\n' +
        'int sequence_search(int *arr, int num, int key){\n' +
        '    int i;\n' +
        '    for(i=0;i<n&&arr[i]!=key;i++);\n' +
        '    if(i<n)\n' +
        '        return i;\n' +
        '    else\n' +
        '        return -1;\n' +
        '}\n',
        `//顺序查找
public static int seqSearch(int[] arr,int value){
     int len = arr.length;
     for (int i = 0; i < len; i++){
        if (arr[i] == value){
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
          name: '查找'
        },
        {
          name: '顺序查找'
        }
      ],
      base: {},
      position: 15,
      isChange: [],
      isRed: -1,
      index: 0,
      isEnd: false,
      isSort: false,
      isFind: false,
      // arr: [2, 5, 8, 34, 54, 60, 89, 99, 100, 101, 110],
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
      val: 60
    }
  },
  components: {
    baseDiv
  },
  // mounted () {
  //   this.base = this.$refs.base
  //   this.base.moveCursor = this.moveCursor
  //   this.base.changeDialog = this.changeDialog
  //   this.base.addDialog = this.addDialog
  // },
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
      let k = this.Player.line
      const that = this.base
      const innerLoop = () => {
        if (that.isPlay && !(that.set.has(k))) {
          if (k === 3 && !this.isEnd) {
            this.moveSort()
            this.isSort = false
          } else if (k === 7 && !this.isEnd) {
            k = 2
            this.isSort = false
          }
          k++
          that.editor.setCursor(k, 0)
          this.Player.line = k
          if (k === 10) {
            this.End()
          }
          setTimeout(() => {
            innerLoop()
          }, that.getSpeed())
        }
        if (that.set.has(k)) {
          that.isPlay = false
          that.focus = k
        }
      }
      innerLoop()
    },
    moveSort () {
      const that = this.base
      var t
      this.isSort = that.isPlay
      // console.log(that)
      const compare = () => {
        if (that.isPlay && this.isSort) {
          if (this.val !== this.datalist[this.index] && this.index < this.datalist.length) {
            this.getPosition()
            this.index++
            this.isRed = this.index
            this.isChange.push(1)
          } else {
            // this.getPosition()
            this.isRed = this.index
            that.isPlay = false
            this.isFind = true
            document.getElementById('reminder').innerText = `找到了!
            return ${this.index}`
            setTimeout(() => {
              this.index = 0
              this.isChange = []
              this.isRed = 0
              this.position = 15
              this.initDataList()
              document.getElementById('reminder').innerText = ''
              that.editor.setCursor(0, 0)
            }, 2000)
          }
          if (this.index !== this.datalist.length) {
            clearTimeout(t)
            t = setTimeout(() => { compare() }, that.getSpeed() + 100)
          } else {
            this.isEnd = true
          }
        }
      }
      if (that.isPlay) {
        compare()
      } else {
        that.isPlay = true
      }
    },
    changeDialog () {

    },
    addDialog () {

    },
    getPosition () {
      this.position = this.position + 60
    },
    End () {
      document.getElementById('reminder').innerText = `没找到!
            return 0`
      this.base.isPlay = false
      setTimeout(() => {
        this.index = 0
        this.isChange = []
        this.isRed = 0
        this.position = 15
        this.initDataList()
        document.getElementById('reminder').innerText = ''
        this.base.editor.setCursor(0, 0)
      }, 2000)
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
</script >
<style lang="less" scoped>
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
    /* background-color: rgb(40, 160, 104); */
    color: #ebedee;
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
