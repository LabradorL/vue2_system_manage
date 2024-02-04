<template>
  <div class="statistical-card" :style="{ '--dotColor': color }">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'StatisticsNumOne',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    label: {
      type:String,
      default: ''
    },
    value: {
      type:String || Number,
      default: ''
    },
    color: {
      type:String,
      default: '#58a3f7'
    }
  },
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
.statistical-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.statistical-card {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  width: 167px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666666;
  font-size: 28px;

  .label {
    font-weight: 400;
    color: #999999;
    font-size: 14px;
    margin-bottom: 8px;
    position: relative;
    &::after {
      content: "";
      width: 9px;
      height: 9px;
      border-radius: 50%;
      position: absolute;
      left: -14px;
      top: 50%;
      transform: translateY(-50%);
      background-color: var(--dotColor, #58a3f7);
    }
  }
  &.blue {
    .label::after {
      background-color: #58a3f7;
    }
  }
  &.yellow {
    .label::after {
      background-color: #fec03d;
    }
  }
}
</style>
