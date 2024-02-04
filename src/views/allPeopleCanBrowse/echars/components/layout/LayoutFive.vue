<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-27 09:39:28
 * @LastEditTime: 2023-10-30 15:15:56
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description:
-->
<template>
  <!-- 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构 -->
  <div class="page-common">
    <div class="top-box">
      <div class="module-box-left">
        <div class="top-left">
          <div class="module-box bg-module">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
      <div class="position-middle">
        <middle-echart-four />
      </div>
      <div class="module-box-right">
        <div class="top-left">
          <div class="module-box bg-module">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-left">
        <div class="bottom-left-item pb-10">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
        <div class="bottom-left-item pt-10">
          <div class="module-box module-outline-style">
            <div class="module-title">饼图合集</div>
            <div class="echarts-box" />
          </div>
        </div>
      </div>
      <div class="bottom-right bottom-left">
        <div class="bottom-left-item pb-10 bottom-item-box">
          <div class="bottom-right-item pr-10">
            <div class="module-box module-outline-style">
              <div class="module-title">饼图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
          <div class="bottom-right-item pl-10">
            <div class="module-box module-outline-style">
              <div class="module-title">饼图合集</div>
              <div class="echarts-box" />
            </div>
          </div>

        </div>
        <div class="bottom-left-item pt-10">
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
import MiddleEchartFour from '../middle/MiddleEchartFour.vue'
export default {
  // 组件名称
  name: 'LayoutFive',
  // 局部注册的组件
  components: { MiddleEchartFour },
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
.top-box {
  height: 30.37%;
  display: flex;
  .top-left {
    height: 100%;
  }
}
.bottom-box {
  height: calc(69.23% - 30px);
  margin-top: 20px;
  display: flex;
  .bottom-left {
    width: 44.15%;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .bottom-left-item {
    height: 50%;
    box-sizing: border-box;
  }
  .pb-10 {
    padding-bottom: 10px;
  }
  .pt-10 {
    padding-top: 10px;
  }
  .bottom-right {
    width: 55.85%;
    padding: 0 0 0 10px;
    .bottom-item-box {
      display: flex;
      .bottom-right-item {
        width: 50%;
      }
      .pl-10 {
        padding-left: 10px;
      };
      .pr-10 {
        padding-right: 10px;
      };
    }
  }
}
</style>
