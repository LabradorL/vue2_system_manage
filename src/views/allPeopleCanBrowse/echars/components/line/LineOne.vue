<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box">
        <div id="LineOne" ref="LineOneRef" class="echarts-content" />
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
  name: 'LineOne',
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
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(10, 21, 54,0.8)',
          textStyle: {
            color: '#f0f2f5'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255,255,255,0)' // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255,255,255,1)' // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          formatter: function(params) {
            let tip = ''
            // x轴的内容
            tip += params[0].name + '</br>'
            if (params != null && params.length > 0) {
              for (let i = 0; i < params.length; i++) {
                tip += params[i].marker + params[i].seriesName + '：' + params[i].value + 'w' + '</br>'
              }
            }
            return tip
          }
        },
        legend: {
          show: true,
          right: '10',
          top: '10',
          itemGap: 50,
          itemWidth: 30,
          textStyle: {
            color: '#fff;',
            fontfamily: 'SourceHanSansCN',
            fontSize: 13
          }
        },
        grid: {
          left: 40,
          right: 0,
          top: '15%',
          bottom: '17%'
        },
        xAxis: {
          axisLabel: {
            show: true,
            color: '#B4B1C2',
            fontfamily: 'SourceHanSansCN',
            fontSize: 13,
            margin: [15],
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: 'rgba(235, 241, 249, 0.2)'
            }
          },
          data: []
        },
        yAxis: {
          name: '单位（万）',
          nameTextStyle: {
            color: '#CED8EC',
            fontSize: 13
          },
          axisLabel: {
            show: true,
            color: '#B4B1C2',
            fontSize: 13
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              with: 1,
              color: 'rgba(235, 241, 249, 0.2)'
            }
          },
          max: function(value) {
            return Math.ceil(value.max + 0.1)
          }
        },
        dataZoom: [{
          show: true,
          // 缩放类型 inside slider select
          type: 'slider',
          height:0, // 滚动条高度
          maxValueSpan: 5, // x轴类目数  最多7个  超出显示缩放组件dataZoom
          moveHandleSize: 8, // 移动手柄的尺寸高度。
          bottom:8, //  dataZoom-slider组件离容器下侧的距离
          borderColor:'transparent'
          // 数据窗口范围的起始数值 可以是数组下标，也可以是数组本身的值
          // startValue: 0,
          // 数据窗口范围的结束数值 可以是数组下标，也可以是数组本身的值
          // endValue: type == '1' ? 6 : 8,
        }, {
          type: 'inside',
          zoomOnMouseWheel: false, // 滚轮是否触发缩放
          moveOnMouseMove: true, // 鼠标滚轮触发滚动
          moveOnMouseWheel: true
        }],
        series:[]
      },
      // 图表元素
      echartsDom: '',
      // 图例
      legendDate: [],
      xAxisData: []
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
            { food: 31000, date: '2023-01', drink: 60600, toy: 160000 },
            { food: 44000, date: '2023-02', drink: 80900, toy: 180000 },
            { food: 56000, date: '2023-03', drink: 101000, toy: 200000 },
            { food: 17000, date: '2023-04', drink: 48000, toy: 120000 },
            { food: 22000, date: '2023-05', drink: 60900, toy: 140000 },
            { food: 69000, date: '2023-06', drink: 162000, toy: 260000 },
            { food: 71000, date: '2023-07', drink: 171000, toy: 270000 },
            { food: 85000, date: '2023-08', drink: 185000, toy: 280000 },
            { food: 73000, date: '2023-09', drink: 164000, toy: 270000 },
            { food: 57000, date: '2023-10', drink: 147700, toy: 250000 },
            { food: 42000, date: '2023-11', drink: 128000, toy: 210000 },
            { food: 32000, date: '2023-12', drink: 80900, toy: 180000 }
          ]
          this.dataList = res.data
          this.formatData(res.data)
        }
      })
    },
    //  数据进行处理
    formatData(data) {
      this.echarsData = []
      this.legendDate = ['食物', '饮品', '玩具']
      const yDatas = [
        data.map(item => Number(item.food / 10000).toFixed(2)),
        data.map(item => Number(item.drink / 10000).toFixed(2)),
        data.map(item => Number(item.toy / 10000).toFixed(2))
      ]
      this.xAxisData = data.map(item => item.date)
      this.legendDate.forEach((item, index) => {
        this.echarsData.push({
          name: item,
          type: 'line',
          smooth: 0.3,
          showSymbol: true,
          symbol: 'rect',
          symbolSize: 10,
          data: yDatas[index],
          color: this.color[index],
          lineStyle: {
            width: 2
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: this.gradientColor[index][0]
                  },
                  {
                    offset: 1,
                    color: this.gradientColor[index][1]
                  }
                ],
                false
              )
            }
          }
        })
      })
      this.$nextTick(() => {
        this.renderingEcharts(data)
      })
    },
    //  渲染图表
    renderingEcharts() {
      this.echartsDom = echarts.init(this.$refs.LineOneRef)
      // this.echartsDom = echarts.init(document.getElementById('LineOne'))
      this.options.color = this.color
      this.options.xAxis.data = this.xAxisData
      this.options.series = this.echarsData
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
