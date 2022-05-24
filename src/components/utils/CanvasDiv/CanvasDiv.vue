<template>
  <canvas id="star-map" ref="starMap">
    Sorry, your browser doesn't support the &lt;canvas&gt; element.
  </canvas>
</template>
<script>
export default {
  name: 'StarMap',
  mounted () {
    this.resizeCanvas()
    this.drawStarMap()
    window.addEventListener('resize', () => {
      this.resizeCanvas()
      // 等待 canvas 变换好，再延时绘制，不然可能会没有内容
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.drawStarMap()
      }, 10)
    })
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    resizeCanvas () {
      this.canvas = document.getElementById('star-map')
      this.context = this.canvas.getContext('2d')
      const parentStyle = window.getComputedStyle(this.canvas.parentNode)
      this.canvas.width = parseInt(parentStyle.width)
      this.canvas.height = document.body.clientHeight - 400
    },
    drawStarMap () {

    }
  }
}
</script>
