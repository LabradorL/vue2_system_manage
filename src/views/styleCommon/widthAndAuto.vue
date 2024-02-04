<template>
  <div class="app-container">
    <!-- 一列定宽，一列自适应 -->
    <fixed-width-and-auto />
    <!-- 两列列定宽，一列自适应 -->
    <fixed-tow-and-auto />
  </div>
</template>

<script>
import FixedWidthAndAuto from './components/fixedOneAndAuto.vue'
import fixedTowAndAuto from './components/fixedTowAndAuto.vue'
export default {
  // 组件名称
  name: 'CommonCss',
  // 局部注册的组件
  components: { FixedWidthAndAuto, fixedTowAndAuto },
  // 组件状态值
  data() {
    return {
      // 遮罩层
      loading: true,
      // 列表数据
      tableData: [],
      // 总数量
      total: 0,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // id集合
      ids: [],
      // 查询参数
      queryParams: { pageNum: 1, pageSize: 10 }

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {},

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
