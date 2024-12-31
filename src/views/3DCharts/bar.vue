<!--
 * @Author: lixiaofeng
 * @Date: 2023-04-28 10:49:00
 * @LastEditTime: 2024-06-20 21:53:59
 * @LastEditors: 李晓风 1091616642@qq.com
 * @Description: 3D饼图
-->
<template>
  <div class="app-container">
    <div ref="threeDimensionalLineRef" class="two-dimensional-pie-box" />
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

  created() { },
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
    initChartOptions() {
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
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.threeDPieChartDom = echarts.init(this.$refs.threeDimensionalLineRef)
      const options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(0,0,0,.6)',
          borderWidth: 1,
          borderColor: '#4ddd8f',
          padding: 5,
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#56DF9F', '#4EB5FF', '#EBD547', '#FFA875'],
        legend: {
          data: ['新机完成数量', '新机启动数量', '再制造完成数量', '再制造启动数量'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          top: '20%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            axisLine: {
              show: true,
              lineStyle: {
                color: '#355C9B'
              }
            },
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
            axisLabel: {
              color: '#FFF'
            },
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            axisLine: {
              show: true,
              lineStyle: {
                color: '#355C9B'
              }
            },
            axisTick: { show: false },
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(53, 92, 155,0.4)',
                width: 1,
                type: 'dotted'
              }
            },
            axisLabel: {
              color: '#FFF'
            }
          }
        ],
        series: [
          // 数据1的柱状图1
          {
            name: '新机完成数量',
            type: 'bar',
            barGap: 0,
            data: [100, 110, 120, 130, 140],
            barWidth: 15,
            barGap: '20%',
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00A155'
                  },
                  {
                    offset: 1,
                    color: '#2FDE8C'
                  }
                ]
              }
            }
          },
          // 数据1顶部的样式
          {
            name: '',
            type: 'pictorialBar',
            symbol: 'diamond',
            symbolSize: [15, 5],
            symbolOffset: ['-180%', -3],
            z: 2,
            symbolPosition: 'end',
            data: [100, 110, 120, 130, 140]
          },
          // 数据2的柱状图2
          {
            name: '新机启动数量',
            type: 'bar',
            barWidth: 15,
            z: 2,
            itemStyle: {
              // lenged文本
              opacity: 1, // 这个是 透明度
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#206FD2'
                  },
                  {
                    offset: 1,
                    color: '#29A0EF'
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: [90, 100, 105, 110, 120]
          },
          // 数据2的顶部
          {
            name: '', // 头部
            type: 'pictorialBar',
            symbol: 'diamond',
            symbolSize: [15, 5],
            symbolOffset: ['-60%', -3],
            z: 12,
            symbolPosition: 'end',
            data: [90, 100, 105, 110, 120]
          },
          // 数据3的柱状图1
          {
            name: '再制造完成数量',
            type: 'bar',
            barGap: 0,
            data: [100, 110, 120, 130, 140],
            barWidth: 15,
            barGap: '20%',
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#AE9003'
                  },
                  {
                    offset: 1,
                    color: '#AE9003'
                  }
                ]
              }
            }
          },
          // 数据3顶部的样式
          {
            name: '',
            type: 'pictorialBar',
            symbol: 'diamond',
            symbolSize: [15, 5],
            symbolOffset: ['60%', -3],
            z: 2,
            symbolPosition: 'end',
            data: [100, 110, 120, 130, 140]
          },
          // 数据4的柱状图1
          {
            name: '再制造启动数量',
            type: 'bar',
            barGap: 0,
            data: [90, 100, 105, 110, 120],
            barWidth: 15,
            barGap: '20%',
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#CF4E1A'
                  },
                  {
                    offset: 1,
                    color: '#F18440'
                  }
                ]
              }
            }
          },
          // 数据4顶部的样式
          {
            name: '',
            type: 'pictorialBar',
            symbol: 'diamond',
            symbolSize: [15, 5],
            symbolOffset: ['180%', -3],
            z: 2,
            symbolPosition: 'end',
            data: [90, 100, 105, 110, 120]
          }
        ]
      }
      this.chartOptions = options
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
        resultDataMap.set(item.name, num + item.dataCount)
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
  background: #01cbd8;
}
</style>

