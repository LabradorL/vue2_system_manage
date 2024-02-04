<!--
 * @Author: lixiaofeng
 * @Date: 2022-11-15 17:01:56
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @LastEditTime: 2023-02-13 22:28:09
 * @Description: 常见的表单
-->
<template>
  <div class="app-container">
    <template v-for="item in typeList">
      <el-button
        :key="item.id + ''"
        :type="item.btnType"
        @click="showModel(item.clickName)"
      >{{ item.title }}</el-button>
    </template>

    <!-- 一列表单 -->
    <one-column :show="oneColumn" @close="close" />
    <two-column :show="twoColumn" @close="close" />
  </div>
</template>

<script>
import OneColumn from './components/oneColumn.vue'
import TwoColumn from './components/twoColumn.vue'
export default {
  // 组件名称
  name: 'Form',
  // 局部注册的组件
  components: { OneColumn, TwoColumn },
  // 组件状态值
  data() {
    return {
      // 单列
      oneColumn: false,
      twoColumn: false,
      id: null,
      typeList: [
        {
          id: 1,
          title: '一列表单',
          // primary success info warning danger
          btnType: 'primary',
          clickName: 'oneColumn'
        },
        {
          id: 2,
          title: '两列表单',
          // primary success info warning danger
          btnType: 'success',
          clickName: 'twoColumn'
        }
      ]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() {},
  beforeUpdate: function() {
    console.log('form beforeUpdate')
  },
  updated: function() {
    this.$nextTick(function() {
    //  仅在整个视图都被重新渲染之后才会运行的代码
    })
    console.log('form updated')
  },
  beforeDestroy() {},
  destroyed() {},
  // 方法
  methods: {
    // 显示对话框
    showModel(type) {
      this[type] = true
    },
    // 关闭页面
    close(type, flag) {
      this[type] = false
      if (flag === true) {
        console.log('重新获取数据')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
