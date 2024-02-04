<!--
 * @Author: lixiaofeng
 * @Date: 2023-05-31 09:40:02
 * @LastEditTime: 2023-06-01 09:51:08
 * @LastEditors: lixf@863jp.com.cn
 * @Description: 柱状图
-->
<template>
  <div ref="twoDLineChartDom" style="width: 100%;height: 100%;" />
</template>
<script>
import * as echarts from 'echarts'
import { getLineChartData, lineOptions, lineSeriesOptions } from '@/const/chartsData/line'
export default {
  // 组件名称
  name: 'TwoDimensionalLineChart',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  data() {
    return {
      // 图表DOM
      twoDLineChartDom: null,
      // 图表配置
      chartOptions: {},
      // 图表数据
      chartData: [],
      // X轴label的数据
      xData: [],
      // 图例
      legendData: [],
      // 区域颜色
      chartAreaStyle: ['#006EE9FF', '#00CCFFFF', '#F5A43AFF', '#5AADD4']
    }
  },
  created() {
    this.chartOptions = lineOptions
    const dataArr = []
    const data = new Date()
    const year = data.getFullYear()
    data.setMonth(data.getMonth() + 1, 1) // 获取到当前月份,设置月份
    for (let i = 0; i < 12; i++) {
      data.setMonth(data.getMonth() - 1) // 每次循环一次 月份值减1
      let m = data.getMonth() + 1
      m = m < 10 ? '0' + m : m
      dataArr.push(year + '年' + m + '月')
    }
    this.xData = dataArr
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getChartData()
    },
    getChartData() {
      getLineChartData().then((res) => {
        res = res.data
        if (res && res.length) {
          const that = this
          // X轴显示的label
          this.xData = res[0].monthList.map((item) => {
            return item.name
          })
          res.forEach((item, idx) => {
            // 需要显示的数据
            const lineData = item.monthList.map((item) => {
              return item.dataCount
            })
            // 一项series的数据
            const chartSeries = {
              ...lineSeriesOptions,
              name: item.name,
              data: lineData,
              // 区域颜色
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: that.chartAreaStyle[idx]
                  },
                  {
                    offset: 1,
                    color: that.chartAreaStyle[idx]
                  }
                ])
              }
            }
            this.chartData.push(chartSeries)
          })
        }
        this.chartOptions.xAxis.data = this.xData
        this.chartOptions.series = this.chartData
        this.initChart()
      })
    },
    resizeChange() {
      if (this.twoDLineChartDom) {
        this.twoDLineChartDom.resize()
      }
    },
    initChart() {
      this.twoDLineChartDom = echarts.init(this.$refs.twoDLineChartDom)
      this.$nextTick(() => {
        this.twoDLineChartDom.setOption(this.chartOptions)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
