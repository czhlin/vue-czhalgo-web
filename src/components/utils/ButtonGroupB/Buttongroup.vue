<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="span-div">主题选择:</div>
          <el-select
            class="them-select"
            v-model="themVal"
            clearable
            filterable
            placeholder="请选择"
            @change="changeTheme"
          >
            <el-option
              v-for="item in themeOp"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div class="span-div">背景音乐:</div>
        <div class="button-div">
          <el-switch
            v-model="music"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <el-select v-model="musicVal" :disabled="!music" placeholder="请选择">
            <el-option
              v-for="item in MusicOp"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      themVal: '棕色',
      musicVal: '千里千寻.mp3',
      music: false,
      themeOp: [],
      MusicOp: []
    }
  },
  mounted () {
    this.themeOp = require('@/json/themeOp.json')
    this.MusicOp = require('@/json/MusicOp.json')
    const music = JSON.parse(window.sessionStorage.getItem('music'))
    const theme = JSON.parse(window.sessionStorage.getItem('theme'))
    if (theme) {
      this.themVal = theme[0]
      this.changeTheme(theme[1])
    }
    if (music) {
      [this.music, this.musicVal] = music
    }
  },
  watch: {
    music: {
      immediate: false,
      handler: function () {
        this.changeMusic()
      }
    },
    musicVal: {
      immediate: false,
      handler: function () {
        this.changeMusic()
      }
    }
  },
  methods: {
    changeTheme (val) {
      const label = this.themeOp.find(v => { return v.value === val }).label
      window.sessionStorage.setItem('theme', JSON.stringify([label, val]))
      console.log(label, val)
      this.$EventBus.$emit('change-theme')
    },
    changeMusic () {
      window.sessionStorage.setItem('music', JSON.stringify([this.music, this.musicVal]))
      this.$EventBus.$emit('change-music')
    }
  }
}
</script>
<style lang="less" scoped>
.el-col {
  text-align: center;
}
.el-switch {
  margin-right: 20px;
}
.span-div {
  display: inline-block;
  margin-right: 20px;
}
.button-div {
  display: inline-block;
}
.them-select {
  width: 280px;
}
</style>
