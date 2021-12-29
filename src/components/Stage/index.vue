<!--
 * @Date: 2021-11-25 11:04:29
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-29 14:03:02
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\components\Stage\index.vue
-->
<template>
  <div class="stage">
    <canvas id="canvas" />
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { getParentWH } from '@/utils'
export default {
  data() {
    return {
      canvas: {
      }
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas')
    window.onresize = this.resizeCanvas.bind(this)
    // 解决第一次加载出现空白页bug
    setTimeout(() => {
      this.resizeCanvas()
    })
  },
  methods: {
    // 窗口尺寸改变响应（修改canvas大小）
    resizeCanvas() {
      this.canvas.setWidth(getParentWH('.stage', 'width'))
      this.canvas.setHeight(getParentWH('.stage', 'height'))
      // 缩放移动视图，使其适应Canvas大小
      // const html = document.documentElement
      // if (html.className === 'mobile') {
      //   this.zoomToFitCanvas()
      // } else {
      //   this.canvas.setZoom(1)
      //   this.canvas.absolutePan({ x: 0, y: 0 })
      // }
      this.zoomToFitCanvas()
    },

    // 缩放移动视图，使其适应Canvas大小
    zoomToFitCanvas() {
      // 先还原缩放比例与位置
      this.canvas.setZoom(1)
      this.canvas.absolutePan({ x: 0, y: 0 })

      // 遍历所有对对象，获取最小坐标，最大坐标
      const objects = this.canvas.getObjects()
      let rect
      let minX
      let minY
      let maxX
      let maxY
      if (objects.length > 0) {
        rect = objects[0].getBoundingRect()
        minX = rect.left
        minY = rect.top
        maxX = rect.left + rect.width
        maxY = rect.top + rect.height
        for (let i = 1; i < objects.length; i++) {
          rect = objects[i].getBoundingRect()
          minX = Math.min(minX, rect.left)
          minY = Math.min(minY, rect.top)
          maxX = Math.max(maxX, rect.left + rect.width)
          maxY = Math.max(maxY, rect.top + rect.height)
        }
      }

      // 计算平移坐标
      const panX = (maxX - minX - this.canvas.width) / 2 + minX
      const panY = (maxY - minY - this.canvas.height) / 2 + minY
      // 开始平移
      this.canvas.absolutePan({ x: panX, y: panY })

      // 计算缩放比例
      const zoom = Math.min(this.canvas.width / (maxX - minX), this.canvas.height / (maxY - minY))
      // 计算缩放中心
      const zoomPoint = new fabric.Point(this.canvas.width / 2, this.canvas.height / 2)
      // 开始缩放
      this.canvas.zoomToPoint(zoomPoint, zoom)
    }
  }
}
</script>

<style lang="scss">
  .stage {
    .canvas-container {
      margin: 0 auto;
    }

  }
</style>
