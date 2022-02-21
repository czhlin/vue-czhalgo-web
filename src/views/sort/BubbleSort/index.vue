<!--
 * @Date: 2021-11-08 10:33:49
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 20:27:28
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\BubbleSort\index.vue
-->
<template>
  <div class="bubble-sort">
    <platform
      ref="platform"
      :config="config"
      :animation="animation"
      :data="animData"
      @edit="editDate"
    >
      <template #change>
        <el-form 
          ref="changeForm" 
          :model="changeForm" 
          :rules="changeRules"
          label-width="100px"
        >
          <el-form-item label="当前数据">
            <el-input :value="arr.toString()" disabled></el-input>
          </el-form-item>
          <el-form-item 
            label="输入数据" 
            prop="arrStr"
          >
            <el-row :gutter="10">
              <el-col 
                :xs="20"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
              >
                <el-input v-model="changeForm.arrStr" ></el-input>
              </el-col>
              <el-col 
                :xs="20"
                :sm="10"
                :md="10"
                :lg="10"
                :xl="10"
              >
                <el-button-group>
                  <el-button type="primary" size="mini" @click="random">随机</el-button>
                  <el-button type="warning" size="mini" @click="resetForm('changeForm')">重置</el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </el-form-item>
          <el-divider content-position="left">注意：输入的数据用英文逗号隔开</el-divider>
        </el-form>
      </template>
      <template #add>
        <el-descriptions 
          :column="1"
          border
          :labelStyle="{textAlign:'right'}"
          >
          <el-descriptions-item label="数据操作">
            <el-button type="info" @click="recovery">复原数据</el-button>
            <el-button type="danger" @click="clearBreakPoint">清空断点</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </platform>
  </div>
</template>
<script>
import Platform from '@/components/Platform'
import animation from './animation'
import config from './config'
import {deepClone} from '@/utils'
import {arrValidater} from '@/utils/validater'
export default {
  components: {
    Platform
  },
  data() {
    return {
      config,
      animation,
      animData:{},
      arr:[49,63,36,100,8,17,6,94,68],
      // 数据输入表单
      changeForm: {
          arrStr:''
      },
      changeRules:{
        arrStr:[
          { required: true, message: '请输入数据', trigger: 'blur' },
          { validator: arrValidater, trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    // 将组件实例挂载到动画上
    animation.setRef(this)
    //更新animData
    this.changeAnimData()
  },
  methods: {
    changeAnimData(){
      this.animData=deepClone({
          arr:this.arr.map(value=>({
            value,
            status:0
          }))
      })
    },
    random(){
      let len=Math.floor(Math.random()*10)+5
      let arr=[];
      for(let i=0;i<len;i++){
        arr.push(Math.floor(Math.random()*100)+1);
      }
      this.changeForm.arrStr=arr.toString()
    },
    editDate(close) {
      this.$refs["changeForm"].validate((valid)=>{
        if(!valid){
          return;
        }
        this.arr=this.changeForm.arrStr
          .trim()
          .split(',')
          .map(item=>Number(item));
        this.changeAnimData()
        close()
      })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    clearBreakPoint(){
      this.$refs.platform.clearBreakPoint()
      this.$message.warning("已清空所有断点!")
    },
    recovery(){
      this.$refs.platform.recovery()
      this.$message.success('排序数据恢复成功!')
    }
  }
}
</script>
