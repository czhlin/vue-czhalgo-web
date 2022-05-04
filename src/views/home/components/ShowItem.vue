<template>
   <div class="show-item">
      <el-col  :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
        <el-card :body-style="{ padding: '0px',height:  '200px',padding:'10px'}">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="content"  
                        @mouseover="hover = true"
                        @mouseleave="hover = false"
                        @click="redirect&&routerToPath(redirect)"
                    >
                       <img :src="imgSrc" alt="">
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <div class="title" @click="redirect&&routerToPath(redirect)"><span>{{title}}</span></div>
                    <div class="tag">
                        <el-tag v-for="(item,index) in tags" :key="item.name" :type="getColor(index)" @click="routerToPath(item.path)">{{item.title}}</el-tag>
                    </div>
                </el-col>
            </el-row>
        </el-card>
     </el-col>
  </div>     
</template>
<script>
import imgUtils from "@/utils/img"
export default {
    props: {
        img: {
            type: String,
            required: false,
            default:""
        },
        title:{
             type: String,
            required: true,
            default:""
        },
        redirect:{
            type: String,
            require:false,
            default:""
        },
        tags: {
            type: Array,
            default: ()=>[]
        }
    },
    computed:{
        imgSrc(){
            return imgUtils[`${this.img}${this.hover?'On':''}`]
        }
    },
    data(){
        return {
            colorArr:[null,"success","info","warning","danger"],
            hover:false,
        }
    },
    methods:{
        getColor(index){
            return this.colorArr[index%this.colorArr.length|0]
        },
        routerToPath(path){
            this.$router.push(path)
        }
    },
}
</script>
<style lang="scss" scoped>
    .show-item {
        .el-card {
            margin: 10px;
            .content {
                margin-right: 10px;
                img {
                    cursor: pointer;
                    width: 100%;
                }
            }
            .title {
                cursor: pointer;
                height: 60px;
                display: flex;
                align-items: center;
            }
            .tag {
                display: flex;
                flex-wrap: wrap;
                justify-content: start;
                .el-tag {
                    margin: 0 10px 10px 0;
                    cursor: pointer;
                }
            }
        }
    }
</style>