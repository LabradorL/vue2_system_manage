<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-03-30 16:40:11
 * @Description: 页面入口
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  // 浏览器页签显示的名称
  metaInfo() {
    return {
      title: '首页',
      titleTemplate: (title) => {
        return title
      }
    }
  },
  created() {
    console.log(window.navigator.language)
  }
}
</script>
<style lang="scss">

// html, body {
// 	min-width: 1200px;
// 	margin: 0;
// 	padding: 0;
// 	background-color: #0b2229;
// }
// #app{
// 	height: 100vh;
// 	overflow: hidden;
// }

.el-loading-mask {
	z-index: 3000 !important;
}

</style>

