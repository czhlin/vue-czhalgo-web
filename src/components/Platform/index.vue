<template>
  <app-container
    ref="appCon"
    :config-obj="config"
    :cursor="cursor_"
    @cursor="cursor=$event"
    @break-fn="isBreak=$event"
    @change="change"
    @edit="$emit('edit',$event)"
    @add="$emit('add',$event)"
  >
    <template #animation>
      <stage ref="stage" />
    </template>
    <template #button-group>
      <slot name="button-group"/>
    </template>
    <template #change-dialog-div>
      <slot name="change">
        你需要设置数据更改...
      </slot>
    </template>
    <template #add-dialog-div>
      <slot name="add">
        你需要设置数据添加...
      </slot>
    </template>
  </app-container>
</template>
<script>
import { AppContainer } from '@/layout/components'
import Stage from '@/components/Stage'
import { mapState, mapActions } from 'vuex'
import Animation from '@/animation'
export default {
  components: {
    AppContainer,
    Stage
  },
  props: {
    config: {
      type: Object,
      default: () => (
        {
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
      )
    },
    animation: {
      type: Function,
      default: () => Animation
    },
    data:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      cursor:1,
      cursor_:1,
      isPlay:false,
      speed:0,
      isBreak(cursor){},
      stage: {},
    }
  },
  computed: {
    ...mapState('animation', ['animState', 'preState','map'])
  },
  watch: {
    animState(val) {
      const { START, FINISH,CODE,ANIM,PEND } = this.map
      switch (val) {
        case START:
          this.init()
          break
        case CODE:
          this.doCode()
          break
        case ANIM:
          this.doAnim()
          break
        case PEND:
          this.doContiune()
          break
        case FINISH:
          this.stage.clear()
          break
      }
    },
    data(){
      this.recovery()
    }
  },
  mounted() {
    this.stage = this.$refs.stage.canvas
    this.stage.selection = false
    this.init()
  },
  methods: {
    ...mapActions(
      'animation',
      [
        'playAnim',
        'startAnim',
        'startCode',
        'continue',
        'endAll',
        'hashBreak'
      ]
    ),
    change(state) {
       this.anim.changeState(state)
       this.isPlay=state.isPlay
       this.speed=state.speed
    },
    clearBreakPoint(){
      this.$refs.appCon.clearBreakPoint()
    },
    recovery(){
      this.endAll()
      this.stage.clear()
      this.init()
    },
    setCursor(n) {
      this.cursor_=n;
    },
    doAnim() {
      this.anim.doAnim()
    },
    doCode() {
       setTimeout(()=>{
         if(!this.isBreak(this.cursor)&&this.isPlay){
            this.anim.doCode()
         }
       },this.speed)
    },
    doContiune(){
      setTimeout(()=>{
        this.continue()
      },this.speed)
    },
    init() {
      const Animation = this.animation
      this.anim = new Animation()
      this.anim.init({
        stage: this.stage,
        anim: {
          animState: this.animState,
          map: this.map
        },
        data:this.data,
        setCursor: this.setCursor.bind(this),
        startAnim: this.startAnim.bind(this),
        startCode: this.startCode.bind(this),
        endAll: this.endAll.bind(this)
      })
      this.$refs.stage.resizeCanvas()
    }
  }
}
</script>
