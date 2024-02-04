<!--
 * @Author: lixiaofeng
 * @Date: 2023-05-31 09:40:02
 * @LastEditTime: 2023-06-07 11:41:28
 * @LastEditors: lixf@863jp.com.cn
 * @Description: 地图
-->
<template>
  <div ref="twoDMapChartDom" style="width: 100%;height: 100%;" />
</template>
<script>
import * as echarts from 'echarts'
import { getMapChartData, mapOptions } from '@/const/chartsData/map'
import henansheng from '@/const/chartsData/map/province/河南省.json'
export default {
  // 组件名称
  name: 'TwoDimensionalMapChart',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  data() {
    return {
      // 图表DOM
      twoDMapChartDom: null,
      // 图表配置
      chartOptions: {},
      // 图表数据
      chartData: [],
      // 区域颜色
      chartAreaStyle: ['#006EE9FF', '#00CCFFFF', '#F5A43AFF', '#5AADD4']
    }
  },
  created() {
    this.chartOptions = mapOptions
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getChartData()
    },
    getChartData() {
      echarts.registerMap('henansheng', henansheng) // 注册矢量地图数据
      getMapChartData().then((res) => {
        res = res.data
        this.chartOptions.series[0].data = res
        this.chartOptions.series[0].map = 'henansheng'
        this.initChart()
      })
    },
    resizeChange() {
      if (this.twoDMapChartDom) {
        this.twoDMapChartDom.resize()
      }
    },
    initChart() {
      this.twoDMapChartDom = echarts.init(this.$refs.twoDMapChartDom)
      this.$nextTick(() => {
        this.twoDMapChartDom.setOption(this.chartOptions)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
