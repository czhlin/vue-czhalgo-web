<!--
 * @Date: 2022-02-19 16:36:26
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 21:24:45
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\MergeSort\index.vue
-->
<template>
  <div class="change-link-list">
   <platform
    :config="config"
    :animation="animation"
    :data="data"
   >

   </platform>
  </div>
</template>

<script>
import Platform from '@/components/Platform'
import animation from './animation'
import config from './config'
import {deepClone} from '@/utils'
export default {
  components: {
    Platform
  },
  data () {
    return {
      config,
      animation,
      data:{},
    }
  },
  created(){
    //  将组件实例挂载到动画上
    animation.setRef(this)
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>

<style>

</style>
