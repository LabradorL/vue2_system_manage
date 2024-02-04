<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-26 10:43:52
 * @LastEditTime: 2023-10-31 10:40:27
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 大屏 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构
                  设计稿 1920 * 1010
                 头部高 88px 上半部分高 580px 下半部分高 308px 上下部分间隔 20px
-->
<template>
  <header-style title="折线图合集">
    <!-- 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构 -->
    <div class="page-common mb-20">
      <div class="echarts-top">
        <div class="module-box-left">
          <div class="top-left-item mb-20">
            <div class="module-box bg-module">
              <div class="module-title">折线图合集1</div>
              <LineOne ref="oneRef" />
            </div>
          </div>
          <div class="top-left-item">
            <div class="module-box module-outline-style">
              <div class="module-title">折线图合集2</div>
              <!-- <LineTwo ref="twoRef" /> -->
              <div class="echarts-box" />
            </div>
          </div>

        </div>

        <div class="position-middle">
          <MiddleEcharTwo />
        </div>
        <div class="module-box-right">
          <div class="top-left-item mb-20">
            <div class="module-box module-outline-style">
              <div class="module-title">折线图合集3</div>
              <!-- <LineThree ref="threeRef" /> -->
              <div class="echarts-box" />
            </div>
          </div>
          <div class="top-left-item">
            <div class="module-box module-outline-style">
              <div class="module-title">折线图合集4</div>
              <!-- <LineFour ref="fourRef" /> -->
              <div class="echarts-box" />
            </div>
          </div>
        </div>
      </div>
      <div class="echarts-bottom">
        <div class="bottom-item pr-10">
          <div class="bottom-content">
            <div class="module-box module-outline-style">
              <div class="module-title">折线图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
        </div>
        <div class="bottom-item pl-10">
          <div class="bottom-content">
            <div class="module-box module-outline-style">
              <div class="module-title">折线图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上下结构 上分左中右结构 下分左右结构 -->
    <layout-two />
    <!-- 左右结构 右结构又分上下结构，上结构又分 左右结构 -->
    <layout-three />
    <!-- 左右结构 右结构又分左右结构-->
    <layout-four />
    <!-- 上下结构 上结构又分左中右 下半部分又分左右结构-->
    <layout-five />


  </header-style>
</template>

<script>
import HeaderStyle from './components/header/EchartsHeader.vue'
import LayoutTwo from './components/layout/LayoutTwo.vue'
import LayoutThree from './components/layout/LayoutThree.vue'
import LayoutFour from './components/layout/LayoutFour.vue'
import LayoutFive from './components/layout/LayoutFive.vue'
import MiddleEcharTwo from './components/middle/MiddleEchartTwo.vue'
import LineOne from './components/line/LineOne.vue'
// import LineTwo from './components/line/LineTwo.vue'
// import LineThree from './components/line/LineThree.vue'
// import LineFour from './components/line/LineFour.vue'
export default {
  // 组件名称
  name: 'EcharsLineList',
  // 局部注册的组件
  components: { HeaderStyle, LayoutTwo, LayoutThree, LayoutFour, LayoutFive, MiddleEcharTwo, LineOne },
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
    this.$nextTick(() =>{
      this.init()
    })
  },
  // 被 keep-alive 缓存的组件激活（显示）时调用。
  activated() { },
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() { },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 方法
  methods: {
    init() {
      this.$refs.oneRef.initData()
      // this.$refs.twoRef.initData()
      // this.$refs.threeRef.initData()
      // this.$refs.fourRef.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-top {
  height: 63.2%;  // 580px
  display: flex;
  margin-bottom: 20px;
  .top-left-item {
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
