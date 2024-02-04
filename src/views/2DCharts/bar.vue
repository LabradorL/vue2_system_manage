<!--
 * @Author: lixiaofeng
 * @Date: 2023-05-31 09:40:02
 * @LastEditTime: 2023-06-07 11:34:31
 * @LastEditors: lixf@863jp.com.cn
 * @Description: 柱状图
-->
<template>
  <div class="chart-container" style="width: 100%; height: 100%">
    <div
      v-for="(item) in barChartNum"
      :key="item"
      :ref="'twoDBarChartRef'"
      class="chart-container-item"
    />
  </div>

</template>
<script>
import * as echarts from 'echarts'
import { getBarChartData, barOptions, getMoreBarChartData, barSeriesOptions } from '@/const/chartsData/bar'
import { sameKeyDataAdd, sameKeyDataPush, deepClone } from '@/utils/common'
export default {
  // 组件名称
  name: 'TwoDimensionalBarChart',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  data() {
    return {
      //  柱形图的数数量
      barChartNum: ['基础柱形图', '多系列柱形图'],
      // 图表DOM列表
      barCharDomArr: [],
      // 图表DOM
      twoDBarChartDom: null,
      // 图表配置
      chartOptions: {},
      // 图表数据
      chartData: [],
      // 柱形图颜色
      barColor: ['#006EE9FF', '#00CCFFFF', '#F5A43AFF']
    }
  },
  created() {
    this.chartOptions = barOptions
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getChartData()
    },
    getChartData() {
      getBarChartData().then((res) => {
        res = res.data
        this.chartData = sameKeyDataAdd(res, 'name', 'value', 'dataCount')
        const seriesList = []
        seriesList.push({
          ...barSeriesOptions,
          name: '总案件数',
          data: this.chartData.map(item => item.value)
        })
        seriesList.push({
          ...barSeriesOptions,
          name: '折线',
          type: 'line',
          label: { show: false },
          data: this.chartData.map(item => item.value).reverse()
        })
        this.chartOptions.series = seriesList
        this.chartOptions.xAxis.data = this.chartData.map(item => item.name)
        this.initChart('twoDBarChartRef', this.chartOptions, 0)
      })
      getMoreBarChartData().then((res) => {
        res = res.data
        const tempSeriesList = sameKeyDataPush(res, 'name', 'value', 'dataCount', true, 'list')
        const xData = res.map(item => item.year)
        const options = deepClone(barOptions)
        const seriesList = []
        tempSeriesList.forEach((item, idx) => {
          seriesList.push({
            ...barSeriesOptions,
            name: item.name,
            data: item.value,
            colorBy: 'series'
          })
        })
        options.xAxis.data = xData
        options.legend.show = true
        options.legend.data = tempSeriesList.map(item => item.name)
        options.series = seriesList
        this.initChart('twoDBarChartRef', options, 1)
      })
    },
    resizeChange() {
      this.barCharDomArr.forEach(item => {
        item.resize()
      })
    },
    initChart(chartDom, chartData, idx) {
      // chartDom chartDom 的Ref值
      // chartData 图表的数据
      // idx 第几个图表
      this.$nextTick(() => {
        const chartRenderDom = echarts.init(this.$refs[chartDom][idx])
        // 判断是否已存在，存在则不push
        if (!this.barCharDomArr[idx]) {
          this.barCharDomArr.push(chartRenderDom)
        }
        chartRenderDom.setOption(chartData)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  color: #fff;
  .chart-container-item {
    width: 50%;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
  }
}
</style>
