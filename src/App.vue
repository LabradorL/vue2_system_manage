<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-04-03 18:06:09
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
  // 不懂
  metaInfo() {
    return {
      title: '首页',
      titleTemplate: (title) => {
        return title
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/mixin.scss";
</style>
