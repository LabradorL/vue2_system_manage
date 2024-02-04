<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box">
        <div id="pieFour" ref="pieFourRef" class="echarts-content" />
      </div>
    </template>
    <div v-else class="empty-box">
      <span class="empty-text">暂无数据</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getPieChartData } from '@/const/chartsData/pie'
export default {
  // 组件名称
  name: 'PieFour',
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      // 是否有数据
      hasData: false,
      // 数据列表
      dataList: [],
      // 图表数据
      echarsData: [],
      // 图表调色盘
      color: ['#00FFFF', '#00FF80', '#FFEA00', '#FF7300', '#9500B3', '#3377FF'],


      // 渐变色配置
      gradientColor: [
        ['#00FFFF', '#0088CC'],
        ['#00FF80', '#009933'],
        ['#FFEA00', '#996100'],
        ['#FF7300', '#CC3A00'],
        ['#9500B3', '#550080'],
        ['#3377FF', '#243CB3']
      ],
      // 图表配置
      options: {
        background:'rgba(0,0,0,0.4)',
        color:[],
        tooltip: {
          show:false,
          trigger: 'item'
        },
        legend: {
          show:false
        },
        // 饼图中间文字
        title: {
          // text: '{name|' + total + '}\n{val| （处）}',
          text: '',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
                padding: [10, 0]
              },
              val: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff'
              }
            }
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'], // 实现圆心和半径
            center:['50%', '50%'], // 实现图表显示位置（左右，上下）
            avoidLabelOverlap: false,
            hoverAnimation: false,
            clockwise: false,
            label: {
              normal: {
                formatter: params => {
                  if (params.name === '饮料'){
                    return (
                      '{name|' + params.name + '}\n{hr|}\n{value1|' + params.value + '处}'
                    )
                  } else if (params.name === '薯片'){
                    return (
                      '{name|' + params.name + '}\n{hr|}\n{value2|' + params.value + '处}'
                    )
                  } else if (params.name === '零食'){
                    return (
                      '{name|' + params.name + '}\n{hr|}\n{value3|' + params.value + '处}'
                    )
                  }
                  return (
                    '{name|' + params.name + '}\n{hr|}\n{value4|' + params.value + '处}'
                  )
                },
                padding: [2, 0, 0, 0],
                rich: {
                  name: {
                    fontSize: 12,
                    padding: [0, -40, 0, -50],
                    color: '#fff'
                  },
                  value1: {
                    fontSize: 12,
                    padding: [0, -40, 0, -30],
                    fontWeight:700,
                    color: '#B5DDD8'
                  },
                  value2: {
                    fontSize: 12,
                    padding: [0, -40, 0, -30],
                    fontWeight:700,
                    color: '#5FA7A4'
                  },
                  value3: {
                    fontSize: 12,
                    padding: [0, -40, 0, -50],
                    fontWeight:700,
                    color: '#FFDC7B'
                  },
                  value4: {
                    fontSize: 12,
                    padding: [0, -40, 0, -30],
                    fontWeight:700,
                    color: '#E37C3E'
                  }
                }
              }
            },
            // 牵引线
            labelLine: {
              normal: {
                show: true,
                length: 15,
                length2: 75
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            data: []
          },
          // 外边框
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['50%', '50%'],
            radius: ['75%', '75%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  borderWidth: 3,
                  borderColor: 'rgba(181,221,216,.38)'
                }
              }
            }]
          },
          // 内边框（虚线框）
          {
            type: 'gauge',
            radius: '60%', // 锯齿半径的大小
            clockwise: true,
            startAngle: '90', // 重要，删除就没效果
            endAngle: '-269.9999', // 重要，删除就没效果
            splitNumber: 90, // 线的条数
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 4,
              lineStyle: {
                color: '#B5DDD8',
                width: 1
              }
            },
            axisLabel: {
              show: false
            }
          }
        ]
      },
      // 图表元素
      echartsDom: '',
      // 图例
      legendDate: []
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
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {
    // 初始化 获取数据
    initData() {
      if (this.echartsDom) {
        this.echartsDom.clear()
      }
      this.hasData = false
      this.dataList = []
      getPieChartData().then(res => {
        if (res.data.length) {
          this.hasData = true
          res.data = [
            { value: 20, name: '零食' },
            { value: 40, name: '薯片' },
            { value: 45, name: '饮料' },
            { value: 10, name: '其他' }
          ]
          this.dataList = res.data
          this.formatData(res.data)
        }
      })
    },
    //  数据进行处理
    formatData(data) {
      this.echarsData = []
      this.legendDate = []
      data.forEach((item, idx) => {
        this.echarsData.push({
          name: item.name,
          value: item.value
        })
        this.legendDate.push(item.name)
      })
      this.$nextTick(() => {
        this.renderingEcharts(data)
      })
    },
    //  渲染图表
    renderingEcharts() {
      this.echartsDom = echarts.init(this.$refs.pieFourRef)
      // this.echartsDom = echarts.init(document.getElementById('pieFour'))
      const total = this.echarsData.reduce((pre, next)=>{ return pre + Number(next.value) }, 0)
      this.options.color = this.color
      this.options.title.text = '{name|' + total + '}\n{val| （处）}'
      this.options.series[0].data = this.echarsData
      this.echartsDom.setOption(this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-box {
  height: 100%;
  display: flex;
  align-items: center;
  .echarts-content {
    width: 100%;
    height: 100%;
  }

}
</style>
