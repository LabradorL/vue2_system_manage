<template>
  <div class="app-container">
    <one-q-rcode />
  </div>
</template>

<script>
import OneQRcode from './components/oneQRcode.vue'
export default {
  // 组件名称
  name: 'QRcode',
  // 局部注册的组件
  components: {
    OneQRcode
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

</style>
