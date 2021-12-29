<template>
  <app-container
    :config-obj="config"
    :cursor="cursor"
    @cursor="cursor=$event"
    @change="change"
    @edit="$emit('edit',$event)"
    @add="$emit('add',$event)"
  >
    <template #animation>
      <stage ref="stage" />
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
    }
  },
  data() {
    return {
      cursor: 1,
      stage: {}
    }
  },
  computed: {
    ...mapState('animation', ['animState', 'map'])
  },
  watch: {
    animState(val) {
      const { CODE, ANIM, START, FINISH } = this.map
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
        case FINISH:
          this.stage.clear()
          break
      }
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
        'endAll'
      ]
    ),
    change(state) {
      if (this.animState !== this.map.FINISH) {
        this.playAnim(state.isPlay)
      }
      this.anim.changeState(state)
    },
    setCursor(n) {
      this.cursor = n
    },
    doAnim() {
      this.anim.doAnim()
    },
    doCode() {
      this.anim.doCode()
    },
    init() {
      const Animation = this.animation
      this.anim = new Animation()
      this.anim.init({
        stage: this.stage,
        setCursor: this.setCursor.bind(this),
        startAnim: this.startAnim.bind(this),
        startCode: this.startCode.bind(this),
        endAll: this.endAll.bind(this)
      })
      this.$refs.stage.resizeCanvas()
      // console.log(this.stage)
    }
  }
}
</script>
