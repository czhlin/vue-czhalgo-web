<!--
 * @Date: 2021-11-08 10:33:49
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 14:06:08
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\views\sort\BubbleSort\index.vue
-->
<template>
  <div class="bubble-sort">
    <platform
      :config="config"
      :animation="animation"
      @edit="editDate"
      @add="addDate"
    />
  </div>
</template>
<script>
import Platform from '@/components/Platform'
import animation from './animation'
import config from './config'
export default {
  components: {
    Platform
  },
  data() {
    return {
      config,
      animation
    }
  },
  created() {
    // 将组件实例挂载到动画上
    animation.setRef(this)
  },
  methods: {
    editDate(close) {
      close()
    },
    addDate(close) {
      close()
    }
  }
}
</script>
