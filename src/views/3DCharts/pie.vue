<!--
 * @Author: lixiaofeng
 * @Date: 2023-04-28 10:49:00
 * @LastEditTime: 2023-09-07 14:11:07
 * @LastEditors: lixiaofeng 1091616642@qq.com
 * @Description: 3D饼图
-->
<template>
  <div class="app-container">
    <div ref="threeDimensionalPieRef" class="two-dimensional-pie-box" />
  </div>

</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl' // 3d图表库
import { getPieChartData } from '@/const/chartsData/pie'
import { getPie3D } from './utils/pieCharts.js'
const color = [
  '#01CBD8',
  '#2451FF',
  '#5AADD4',
  '#B35AFF',
  '#EDCC31',
  '#4B8EB1'
]
export default {
  // 组件名称
  name: 'ThreeDimensionalPieChart',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      // 图表DOM
      threeDPieChartDom: null,
      // 图表配置
      chartOptions: {},
      // 图表数据
      chartData: [],
      optionsData: []
    }
  },
  // 计算属性
  computed: {},

  created() {},
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
      this.chartData.forEach((item, index) => {
        item.itemStyle = {
          color: color[index]
        }
        item.label = {
          normal: {
            show: true, // 是否显示引导线和数据
            color: color[index],

            // formatter: [
            //   '{b|{b}}',
            //   '{c|{c}}{b|起}',
            //   '{d|{d}%}'
            // ].join('\n'), // 用\n来换行
            // formatter: ["{c|{c}}{b|起}"].join("\n"), // 用\n来换行
            formatter: ['{d|{d}%}'].join('\n'), // 用\n来换行
            rich: {
              b: {
                color: '#fff',
                lineHeight: 25,
                align: 'left'
              },
              c: {
                fontSize: 12,
                color: '#fff',
                textShadowColor: '#1c90a6',
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5
              },
              d: {
                color: color[index],
                align: 'left'
              }
            }
          }
        }
        item.labelLine = { // 引导线设置
          normal: {
            show: true, // 引导线显示
            lineStyle: {
              width: 1,
              color: 'rgba(255,255,255,0.7)'
            },
            // 视觉引导线第一段的长度
            length: 30,
            // 视觉引导项第二段的长度
            length2: 50
          }
        }
      })
    },
    // 获取图表数据
    getChartData() {
      getPieChartData().then(res => {
        res = res.data
        this.chartData = this.dataHandle(res)
        this.initChartOptions()
        this.$nextTick(() => {
          this.initChart()
        })
      })
    },
    // 初始化图表（注册）
    initChart(){
      // 基于准备好的dom，初始化echarts实例
      this.threeDPieChartDom = echarts.init(this.$refs.threeDimensionalPieRef)
      // 传入数据生成 chartData, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.chartOptions = getPie3D(this.chartData, 0, 540, 28, 26, 1)
      console.log(this.chartOptions)
      // 将配置的内容进行渲染
      this.threeDPieChartDom.setOption(this.chartOptions)
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      this.chartOptions.series.push({
        // 类型
        type: 'pie',
        // 从option.colord的取色策略 series | data
        // series 同一系列中的所有数据都是用相同的颜色
        // data 每个数据项都使用不同的颜色
        colorBy: 'data',
        // 饼图图形上的文本标签
        label: {
          show: true, // 是否显示文本标签
          opacity: 1, // 默认为0
          // color: 'fff', // 文本颜色
          // 标签位置 outside | inside |inner | center
          position: 'outside'
          // 标签文字格式化 string | Function
          // formatter: (params) => {
          //   console.log(params)
          //   return ''
          // }
        },
        startAngle: -23, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        data: this.chartData,
        radius: [0, '40%'],
        center: ['33%', '50%'],
        itemStyle: {
          opacity: 0, // 这里必须是0，不然2d的图会覆盖在表面
          fontSize: 10
        },
        zlevel: 10
      })
      this.threeDPieChartDom.setOption(this.chartOptions)
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
.two-dimensional-pie-box {
  padding: 10px 30px;
  width: 472px;
  height: 275px;
  // height: 200px;
  background: #01CBD8;
}

</style>

