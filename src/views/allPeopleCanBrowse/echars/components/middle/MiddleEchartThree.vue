<template>
  <div class="middle-content">
    <div v-for="(item) in 4" :key="item" :class="['middle-item-wrapper', 'animation']">
      <div class="middle-item-box">
        <div class="middle-item-content">
          <div class="middle-item-count">423</div>
          <div class="data-unit">条</div>
        </div>
      </div>
      <div class="middle-item-label">label</div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'EcharsMiddleThree',
  // 局部注册的组件
  components: {},
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
.middle-content {
    width: 100%;
    height: 100%;
    bottom: 20px;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .middle-item-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .middle-item-box {
        width: 140px;
        height: 121px;
        background: url("../../images/middle_item_bg1.svg") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .middle-item-content {
          width: 111px;
          height: 95px;
          background: url("../../images/middle_item_bg2.svg") no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .middle-item-count {
            font-size: 40px;
            color: #36cde6;
          }
          .data-unit {
            font-size: 14px;
            color: #36cde6;
          }
        }
      }
      .middle-item-label {
        width: 143px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: white;
        background: #0687af;
        font-size: 14px;
      }
    }
    .animation{
      animation: itemAnimation 1.5s linear infinite;
    }
    @keyframes itemAnimation {
      0% {
        transform: translate(0, 0px);
      }
      50% {
        transform: translate(0, -10px);
      }
      100% {
        transform: translate(0, 0px);
      }
    }
  }
</style>
