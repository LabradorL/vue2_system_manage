<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-25 17:25:21
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-14 17:26:19
 * @Description: 登录后回到登录前的页面
-->
<script>
export default {
  name: 'RedirectName',
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
