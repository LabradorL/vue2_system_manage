<!--
 * @Author: lixiaofeng
 * @Date: 2023-04-28 10:49:00
 * @LastEditTime: 2023-05-31 11:42:41
 * @LastEditors: lixf@863jp.com.cn
 * @Description: 2D饼图
-->
<template>
  <div ref="twoDimensionalPieRef" style="width:100%;height:100%" />
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl' // 3d图表库
import { getPieChartData, pieOptions } from '@/const/chartsData/pie'
export default {
  // 组件名称
  name: 'TwoDimensionalPieChart',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      // 图表DOM
      twoDPieChartDom: null,
      // 图表配置
      chartOptions: {},
      // 图表数据
      chartData: []
    }
  },
  // 计算属性
  computed: {},

  created() {
    this.initChartOptions()
  },
  mounted() {
    this.getChartData()
  },
  beforeDestroy() {
  },
  destroyed() {
  },

  // 组件方法
  methods: {
    // 初始化图表配置
    initChartOptions(){
      this.chartOptions = pieOptions
    },
    // 获取图表数据
    getChartData() {
      getPieChartData().then(res => {
        res = res.data
        this.chartData = this.dataHandle(res)
        this.chartOptions.series[0].data = this.chartData
        this.$nextTick(() => {
          this.initChart()
        })
      })
    },
    // 初始化图表（注册）
    initChart(){
      // 基于准备好的dom，初始化echarts实例
      this.twoDPieChartDom = echarts.init(this.$refs.twoDimensionalPieRef)
      // 将配置的内容进行渲染
      this.twoDPieChartDom.setOption(this.chartOptions)
    },
    // 数据处理, 处理成符合echars的数据 {name: 'XXX', value: XX}
    dataHandle(res) {
      // 最终结果的map对象,可以针对展示的内容根据后端返回的数据进行展示，不确定性大
      const resultDataMap = new Map()
      res.forEach(item => {
        let num = 0
        // 是否存在某一项数据, 存在取出对应的值
        if (resultDataMap.has(item.name)) {
          num = resultDataMap.get(item.name)
        }
        resultDataMap.set(item.name, num + item.dataCount )
      })
      const resultData = [...resultDataMap].map(([key, value]) => {
        return {
          name: key,
          value: value
        }
      })
      return resultData
    }
  }
}
</script>

<style lang="scss" scoped>


</style>

