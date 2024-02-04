<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-27 09:39:28
 * @LastEditTime: 2023-10-31 14:53:47
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description:
-->
<template>
  <!-- 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构 -->
  <div class="page-common">
    <div class="left-right-layout-box">
      <div class="module-box-left">
        <div class="left-top mb-20">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
        <div class="left-bottom">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
      <div class="middle-box position-middle">
        <div class="midddle-top">
          <MiddleEchartThree />
        </div>
        <div class="middle-bottom">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
      <div class="module-box-left">
        <div class="left-top mb-20">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
        <div class="left-bottom">
          <div class="module-box bg-module">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiddleEchartThree from '../middle/MiddleEchartThree.vue'
export default {
  // 组件名称
  name: 'LayoutThree',
  // 局部注册的组件
  components: { MiddleEchartThree },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {}
}
</script>

<style lang="scss" scoped>
.left-right-layout-box {
  display: flex;
  height: 100%;
  .left-top {
    height: 63.2%;
  }
  .left-bottom {
    height: 33.5%;
  }
 .middle-box {
  .midddle-top {
    height: 21.74%;
    box-sizing: border-box;
    padding-top: 20px;
  }
  .middle-bottom {
    margin-top: 20px;
    height: 76.087%;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
 }
}
</style>
