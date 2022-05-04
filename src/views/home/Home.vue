<template>
  <div class="home">
    <show-item v-for="item in showItemArray" :key="item.key" :img="item.img" :redirect="item.redirect" :title="item.title" :tags="item.tags"/>
  </div>
</template>

<script>
import {ShowItem} from "./components"
import { asyncRoutes } from '@/router'
export default {
  name: 'Home',
  components: {
    ShowItem
  },
  data(){
    return {
      showItemArray:[]
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data=[]
      asyncRoutes.forEach((Route,i)=>{
        if(Route.hidden){
          return
        }
        const ansItem={}
        if(Route.redirect){
          ansItem.redirect=Route.redirect
        }
        ansItem.img=Route.meta.src
        ansItem.key=i
        ansItem.title=Route.meta.title
        if(Route.children&&Route.children.length>0){
          ansItem.tags=[]
          Route.children.forEach(item=>{
            ansItem.tags.push({
              path:item.path.startsWith("/")
                  ?item.path
                  :`${Route.path}/${item.path}`,
              title:item.meta.title
            })
          })
        }
        data.push(ansItem)
      })
      this.showItemArray=data
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    // color: red;
    padding: 20px;
  }
</style>
