<!--
 * @Author: lixiaofeng
 * @Date: 2023-10-26 10:43:52
 * @LastEditTime: 2023-10-31 14:57:37
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 大屏 结构为上下结构，上半部分又分为 左中右部分，下半部分分为左右结构
                  设计稿 1920 * 1010
                 头部高 88px 上半部分高 580px 下半部分高 308px 上下部分间隔 20px
-->
<template>
  <header-style title="关系图合集">

    <div class="page-common">
      <div class="left-right-layout-box">
        <div class="module-box-left">
          <div class="left-top mb-20">
            <div class="module-box module-outline-style">
              <div class="module-title">关系图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
          <div class="left-bottom">
            <div class="module-box module-outline-style">
              <div class="module-title">关系图合集</div>
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
              <div class="module-title">关系图合集</div>
              <graph-one ref="oneRef" />
            </div>
          </div>
        </div>
        <div class="module-box-left">
          <div class="left-top mb-20">
            <div class="module-box module-outline-style">
              <div class="module-title">关系图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
          <div class="left-bottom">
            <div class="module-box bg-module">
              <div class="module-title">关系图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </header-style>
</template>

<script>
import HeaderStyle from './components/header/EchartsHeader.vue'
import MiddleEchartThree from './components/middle/MiddleEchartThree.vue'
import GraphOne from './components/graph/GraphOne.vue'
export default {
  // 组件名称
  name: 'EcharsPieList',
  // 局部注册的组件
  components: { HeaderStyle, MiddleEchartThree, GraphOne },
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
