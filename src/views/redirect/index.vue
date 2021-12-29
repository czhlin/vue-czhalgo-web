<!--
 * @Date: 2021-11-04 20:10:14
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-28 11:10:17
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\views\redirect\index.vue
-->
<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
