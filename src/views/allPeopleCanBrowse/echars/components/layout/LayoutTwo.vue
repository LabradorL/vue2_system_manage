<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-27 09:39:28
 * @LastEditTime: 2023-10-27 14:37:00
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description:
-->
<template>
  <!-- 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构 -->
  <div class="page-common">
    <div class="echarts-top">
      <div class="module-box-left">
        <div class="top-left">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>

      <div class="position-middle">
        <MiddleEchartOne />
      </div>
      <div class="module-box-right">
        <div class="top-right-item mb-20">
          <div class="module-box bg-module">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
        <div class="top-right-item">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
    </div>
    <div class="echarts-bottom">
      <div class="bottom-item pr-10">
        <div class="bottom-content">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
      <div class="bottom-item pl-10">
        <div class="bottom-content">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiddleEchartOne from '../middle/MiddleEchartOne.vue'
export default {
  // 组件名称
  name: 'LayoutTwo',
  // 局部注册的组件
  components: { MiddleEchartOne },
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
.echarts-top {
  height: 63.2%; // 580px
  display: flex;
  margin-bottom: 20px;
  .top-right-item {
    height: 48.3%;
  }
  .top-left {
    height: 100%;
  }
}
.echarts-bottom {
  height: 33.5%; // 308px
  display: flex;
  .bottom-item {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    .bottom-content {
      height: 100%;
      width: 100%;
    }
  }
  .pl-10 {
    padding-left: 10px;
  }
  .pr-10 {
    padding-right: 10px;
  }
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
