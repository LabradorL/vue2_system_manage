<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-02-04 14:35:37
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
