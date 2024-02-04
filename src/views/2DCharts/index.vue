<!--
 * @Author: lixiaofeng
 * @Date: 2023-05-31 11:06:32
 * @LastEditTime: 2023-10-06 15:40:20
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description:
-->
<template>
  <div class="app-container ">
    <div class="item-echars-box flex50">
      <bar ref="barEcharRef" />
    </div>
    <div class="echars-box flex">
      <div class="item-echars-box bg-color">
        <pie-echar class="pieEcharRef" />
      </div>
      <div class="item-echars-box">
        <line-echar class="lineEcharRef" />
      </div>
    </div>
    <div class="item-echars-box height500">
      <map-echar class="mapEcharRef" />
    </div>
  </div>

</template>

<script>
import bar from './bar.vue'
import lineEchar from './line.vue'
import pieEchar from './pie.vue'
import mapEchar from './map.vue'
export default {
  // 组件名称
  name: 'TwoDimensionalCharts',
  // 局部注册的组件
  components: { bar, pieEchar, lineEchar, mapEchar },
  // 组件状态值
  data() {
    return {

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.echars-box {
  flex-wrap: wrap;
}
.item-echars-box {
  flex: 30%;
  margin-right: 1%;;
  height: 200px;
}
.flex50 {
  flex: 50%;
}
.bg-color {
  background: #01CBD8;
}
.height500 {
  height: 500px;
}
</style>
