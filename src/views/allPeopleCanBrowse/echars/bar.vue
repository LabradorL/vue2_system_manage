<template>
  <Header-style title="柱状图合集">
    <div class="page-common">
      <div class="echarts-top">
        <div class="module-box-left">
          <div class="top-left">
            <div class="module-box module-outline-style">
              <div class="module-title">柱状图合集</div>
              <BarTwo ref="twoRef" />
            </div>
          </div>
        </div>

        <div class="position-middle">
          <!-- <MiddleEchartOne /> -->
        </div>
        <div class="module-box-right">
          <div class="top-right-item mb-20">
            <div class="module-box bg-module">
              <div class="module-title">柱状图合集</div>
              <BarOne ref="oneRef" />
            </div>
          </div>
          <div class="top-right-item">
            <div class="module-box module-outline-style">
              <div class="module-title">柱状图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
        </div>
      </div>
      <div class="echarts-bottom">
        <div class="bottom-item pr-10">
          <div class="bottom-content">
            <div class="module-box module-outline-style">
              <div class="module-title">柱状图合集</div>
              <div class="echarts-box" />
            </div>
          </div>
        </div>
        <div class="bottom-item pl-10">
          <div class="bottom-content">
            <div class="module-box module-outline-style">
              <div class="module-title">柱状图合集</div>
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
import BarOne from './components/bar/BarOne.vue'
import BarTwo from './components/bar/BarTwo.vue'
export default {
  // 组件名称
  name: 'EcharsBarList',
  // 局部注册的组件
  components: { HeaderStyle, BarOne, BarTwo },
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
    this.$nextTick(() => {
      this.init()
    })
  },
  // 被 keep-alive 缓存的组件激活（显示）时调用。
  activated() {},
  // 被 keep-alive 缓存的组件失活（隐藏）时调用。
  deactivated() {},
  beforeDestroy() {
  },
  destroyed() {
  },
  // 方法
  methods: {
    init() {
      this.$refs.oneRef.initData()
      this.$refs.twoRef.initData()
      // this.$refs.threeRef.initData()
      // this.$refs.fourRef.initData()
    }
  }
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
