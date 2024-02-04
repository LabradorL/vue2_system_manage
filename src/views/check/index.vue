<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-10 16:45:17
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-02-02 15:39:41
 * @Description: 常见的查看样式
-->
<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="showModel('tableCheckFlag')"
    >表格查看</el-button>
    <el-button
      type="success"
      @click="showModel('oneModulesFlag')"
    >一个模块内容的查看</el-button>
    <el-button
      type="info"
      @click="showModel('moreModulesFlag')"
    >多个模块查看</el-button>
    <el-button
      type="warning"
      @click="showModel('loopFlag')"
    >循环查看</el-button>
    <el-button
      type="danger"
      @click="showModel('formAndTableFlag')"
    >查看操作同时存在</el-button>
    <!-- 循环查看 -->
    <loop :show="loopFlag" @close="close" />
    <!-- 多个模块查看 -->
    <more-modules :show="moreModulesFlag" @close="close" />
    <!-- 单个模块查看 -->
    <one-module :show="oneModulesFlag" @close="close" />
    <!-- 表格查看 -->
    <table-check :show="tableCheckFlag" @close="close" />
    <!-- 可操作和不可操作同时存在 -->
    <form-and-table :show="formAndTableFlag" @close="close" />
  </div>
</template>

<script>
import Loop from './components/loop.vue'
import MoreModules from './components/moreModules.vue'
import OneModule from './components/oneModule.vue'
import TableCheck from './components/table.vue'
import FormAndTable from './components/formAndTable.vue'
export default {
  // 组件名称
  name: 'CheckComponents',
  // 局部注册的组件
  components: { Loop, MoreModules, OneModule, TableCheck, FormAndTable },
  // 组件状态值
  data() {
    return {
      // 循环对话框
      loopFlag: false,
      // 多个模块对话框
      moreModulesFlag: false,
      // 循环对话框
      oneModulesFlag: false,
      // 表格对话框
      tableCheckFlag: false,
      // 表格和form表单同时存在
      formAndTableFlag: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  // 被 keep-alive 缓存的组件激活（显示）时调用。",
  activated(){
    console.log('check activated')
  },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated(){
    console.log('check deactivated')
  },
  // 方法
  methods: {
    // 显示对话框
    showModel(flag) {
      this[flag] = true
    },
    // 关闭对话框
    close(dialogType, flag) {
      this[dialogType] = false
      if (flag === true) {
        // 获取列表
        console.log('重新获取列表')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
