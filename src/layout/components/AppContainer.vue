<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">动画</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(level, index) in levelList"
            v-cloak
            :key="index"
            :to="{ path: level.path }"
          >
            {{ level.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10" class="show-row">
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
            class="anim-box"
          >
            <el-card class="animation-card">
              <slot
                name="animation"
                :speed="palySpeed"
                :isPlay="isPlay"
                :isBreakpoint="isBreakpoint"
                :cursor="cursor_"
                :language="getlanguage"
              />
            </el-card>
            <div style="text-align: center; margin-top: 10px">
              <slot name="button-group">
                <el-button-group>
                  <el-button
                    type="primary"
                    :disabled="display.edit"
                    icon="el-icon-edit"
                    @click="changeDialogVisible = true"
                  />
                  <el-button
                    v-if="isPlay"
                    type="warning"
                    icon="el-icon-video-pause"
                    @click="pause"
                  />
                  <el-button
                    v-else
                    type="warning"
                    icon="el-icon-video-play"
                    @click="play"
                  />
                  <el-button
                    type="danger"
                    :disabled="display.add"
                    icon="el-icon-plus"
                    @click="addDialogVisible = true"
                  />
                </el-button-group>
              </slot>
            </div>
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
          >
            <div class="code-box">
              <div class="code-mirror-box">
                <codemirror
                  ref="code"
                  v-model="codeData"
                  class="code-mirror"
                  :options="codemirrorOption"
                  @gutterClick="gutterClick"
                  @cursorActivity="cursorActivity"
                />
              </div>
            </div>
            <div class="code-control">
              <el-row :gutter="10">
                <el-col
                  class="mode-info"
                  :xs="0"
                  :sm="4"
                  :md="4"
                  :lg="4"
                  :xl="4"
                >
                  <div class="span-div text-hid">语言选择:</div>
                </el-col>
                <el-col
                  class="mode-radio"
                  :xs="24"
                  :sm="8"
                  :md="8"
                  :lg="10"
                  :xl="8"
                >
                  <div class="radio-div">
                    <el-radio-group v-model="language" size="mini" @change="changeDataCode">
                      <el-radio-button label="0" border>C</el-radio-button>
                      <el-radio-button label="1" border>C++</el-radio-button>
                      <el-radio-button label="2" border>Java</el-radio-button>
                    </el-radio-group>
                  </div>
                </el-col>
                <el-col
                  class="theme-select"
                  :xs="24"
                  :sm="10"
                  :md="10"
                  :lg="8"
                  :xl="10"
                >
                  <el-select v-model="themeVal" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in themeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-dialog
          :title="title[0]"
          :visible.sync="changeDialogVisible"
          :before-close="handleClose"
        >
          <slot name="change-dialog-div" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="changeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeDialog()">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :title="title[1]"
          :visible.sync="addDialogVisible"
          :before-close="handleClose"
        >
          <slot name="add-dialog-div" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDialog()">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
      <el-footer style="height: auto">
        <el-card shadow="hover">
          <el-row :gutter="10">
            <el-col :xs="0" :sm="4" :md="3" :lg="3" :xl="2">
              <div class="span-div">播放速度:</div>
            </el-col>
            <el-col :xs="24" :sm="20" :md="21" :lg="9" :xl="10">
              <el-slider v-model="speed" />
            </el-col>
          </el-row>
        </el-card>
      </el-footer>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
  .app-container {
    .show-row {
      margin-top: 10px;
      min-height: 60vh;
      .anim-box {
        height: 60vh;
        padding-bottom: 10px;
        .animation-card {
          height: 90%;
        }
      }
      .code-box {
        .code-mirror-box {
          height: 100%;
          font-size: 20px;
          .code-mirror {
            height: 53vh;
            background: #2B2B2B;
          }
        }
      }
      .code-control {
          margin-top: 10px;
          .el-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .el-col {
              height: 100%;
            }
          }
      }
    }
    .span-div {
      height: 100%;
      display: flex;
      height: 38px;
      font-size: 18px;
      align-items: center;
    }
  }
</style>
<style lang="scss">
@import '~@/styles/vw-rem.scss';
  .app-container {
    .animation-card {
         .el-card__body {
           width: 100%;
           height: 100%;
         }
    }
    .CodeMirror {
      height: 100%;
      .CodeMirror-vscrollbar {
        display: none !important;
      }
    }
  }
  html.mobile {
    @include root-font-size();
    body {
      font-size:16px;
    }
    .app-container {
      padding: 0;
      .animation-card {
         font-size:px2rem(10);
         .el-card__body {
           width: 100%;
           height: 100%;
         }
        }
      .show-row {
        .code-box .code-mirror-box {
          font-size:px2rem(14)
        }
      }
      .el-main {
        padding-left: 0;
        padding-right: 10px;
        overflow: hidden;
      }
      .el-footer {
        padding-left:0;
        padding-right: 10px;
      }
      @media only screen and (max-width: 768px) {
        .code-control {
           .el-col {
             flex-shrink: 0;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
          }
          .mode-info {
            display: none;
          }
        }
      }
    }
  }
</style>
<script>
import { objKeyValueIsSame } from '@/utils/validate'
import { mapState, mapActions } from 'vuex'
const { mode, theme } = require('@/json/codeTheme.json')
export default {
  name: 'AppContainer',
  props: {
    configObj: {
      type: Object,
      default: () => {
        return {
          option: {
            mode: 'text/x-java',
            readOnly: true
          },
          title: [
            '更改数组',
            '输入数据'
          ],
          levelList: [
            {
              name: 'xxx'
            },
            {
              name: 'yyy'
            }
          ],
          display: {
            add: false,
            edit: false
          },
          codeDataList: ['没有代码...', '没有代码...', '没有代码...']
        }
      }
    },
    cursor: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ...this.configObj,
      // 语言切换默认是java[c、c++、java]
      language: '2',
      // 默认动画速度50%
      speed: 50,
      // 是否在播放
      isPlay: false,
      // 数据更改弹框
      changeDialogVisible: false,
      // 数据添加弹框
      addDialogVisible: false,
      // 判断当前在哪个位置
      focus: -1,
      // 光标位置
      cursor_: this.cursor,
      cursor_time: 0,
      themeVal: 'darcula',
      themeOption: theme,
      modeOption: mode,
      codeData: '',
      breakpoints: new Set()
    }
  },
  // 计算属性
  computed: {
    ...mapState('animation', ['animState', 'map']),
    /* 合并codemirror配置 */
    codemirrorOption() {
      return {
        ...this.option,
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        theme: 'darcula',
        gutters: ['CodeMirror-linenumbers', 'breakpoints']
      }
    },
    // 获得播放速度
    palySpeed() {
      return 801 - 8 * this.speed
    },
    // 判断当前是不是断点
    isBreakpoint() {
      return {
        value: this.breakpoints.has(this.cursor - 1),
        cursor_time: this.cursor_time,
        time: Date.now()
      }
    },
    // 判断当前语言
    getlanguage() {
      return this.modeOption[this.language].label
    },
    // change事件触发
    changeVal() {
      return {
        speed: this.palySpeed,
        isPlay: this.isPlay,
        isBreakpoint: this.isBreakpoint.value,
        language: this.getlanguage
      }
    }
  },
  // 监听
  watch: {
    themeVal(newVal, oldVal) {
      this.editor.setOption('theme', newVal)
    },
    cursor(newVal) {
      this.setCursor(newVal - 1, 0)
    },
    changeVal(newVal, oldVal) {
      if (!objKeyValueIsSame(newVal, oldVal)) {
        this.$emit('change', newVal)
      }
    },
    animState(val) {
      if (val === this.map.FINISH) {
        this.pause()
        this.playAnim(true)
      }
    },
    isBreakpoint(newVal) {
      const { CODE, ANIM } = this.map
      const stateArr = [CODE, ANIM]
      if (newVal.value && stateArr.includes(this.animState)) {
        this.pause()
        this.playAnim(false)
      }
    }
  },
  // 挂载
  mounted() {
    this.init()
    this.changeDataCode()
  },
  // 方法
  methods: {
    ...mapActions('animation', ['playAnim']),
    // 初始化
    init() {
      this.editor = this.$refs.code.codemirror
    },
    cursorActivity(val) {
      this.cursor_ = val.doc.getCursor().line + 1
      this.cursor_time = Date.now()
      this.$emit('cursor', this.cursor_)
    },
    // 播放
    play() {
      this.isPlay = !this.isPlay
    },
    // 暂停
    pause() {
      this.isPlay = false
    },
    // 设置光标位置
    setCursor(row, col) {
      row = row % this.editor.lineCount()
      this.cursor_ = row
      this.cursor_time = Date.now()
      this.editor.setCursor(row, col, {
        scroll: false
      })
    },
    // 更改数据
    changeDialog() {
      this.$emit('edit', () => (this.changeDialogVisible = false))
    },
    // 添加数据
    addDialog() {
      this.$emit('add', () => (this.addDialogVisible = false))
    },
    // 切换代码语言
    changeDataCode() {
      this.codeData = this.codeDataList[this.language]
      this.editor.setOption('mode', this.modeOption[this.language].value)
    },
    // 生成断点
    makeMarker() {
      var marker = document.createElement('div')
      marker.style.color = '#FA7A6D'
      marker.innerHTML = '●'
      return marker
    },
    // 打断点
    gutterClick(cm, n) {
      const info = cm.lineInfo(n)
      this.breakpoints.has(n) ? this.breakpoints.delete(n) : this.breakpoints.add(n)
      cm.setGutterMarker(
        n,
        'breakpoints',
        info.gutterMarkers ? null : this.makeMarker()
      )
    },
    // 关闭提示
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

