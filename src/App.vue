<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-14 17:26:25
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
