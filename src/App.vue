<!--
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: lixf@863jp.com.cn
 * @LastEditTime: 2023-06-30 14:34:55
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
  },
  created() {
    console.log(window.navigator.language)
  }
}
</script>
