<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box">
        <div id="pieTwo" ref="pieTwoRef" class="echarts-content" />
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
  name: 'PieTwo',
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
        backgroundColor: 'transparent',
        color: [],
        tooltip: {
          trigger: 'item'
        },
        legend:    {
          type: 'scroll',
          pageIconColor: '#76b9ff',
          pageIconInactiveColor: 'yellow',
          pageTextStyle: {
            color: '#76b9ff',
            fontSize: 12
          },
          // orient: 'vertical',
          right: '1%',
          left: '1%',
          bottom: '2%',
          itemGap: 30,
          textStyle: {
            color: '#ffffff',
            fontSize: 12,
            rich: {
              name: {
                width: 80,
                fontSize: 16
              },
              value: {
                width: 20,
                fontSize: 16,
                padding: [0, 0, 0, 50]
              },
              percent: {
                width: 10,
                fontSize: 16
              }
            }
          },
          data: this.echarsData
          // formatter: (name) => {
          //   if (resultData.length) {
          //     const item = resultData.filter((item) => item.name === name)[0]
          //     return `{name|${name}}{value| ${item.percent}%}{value| ${item.value}km²}`
          //   }
          // }

        },
        series: [
          {
            name: '类型',
            type: 'pie',
            radius: ['30%', '50%'], // 数组的第一项是内半径，第二项是外半径
            center: ['50%', '40%'], // 控制饼图的位置 第一项水平方向，第二项垂直方向
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 40,
                lineStyle: {
                  // color: '#e6e6e6'
                }
              }
            },
            label: {
              show: true,
              fontSize: 12,
              lineHeight: 20,
              align: 'center',
              borderColor: 'none',
              textBorderColor: 'none',
              color: '#fff',
              formatter: function(params) {
                const name = params.name
                const percent = params.value + '个'
                const index = params.dataIndex || 0
                return [`{a${index}|${name}}\n{b${index}|${percent}}`]
              }
              // rich: getRich()
            },
            data: []
          }
        ] },
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
            {
              name: '土豆',
              value: '3720'
            },
            {
              name: '山药',
              value: '900'
            },
            {
              name: '玉米',
              value: '2200'
            },
            {
              name: '番茄',
              value: '1420'
            },
            {
              name: '大豆',
              value: '3200'
            },
            {
              name: '韭菜',
              value: '2420'
            }, {
              name: '菠菜',
              value: '820'
            }, {
              name: '娃娃菜',
              value: '1200'
            }, {
              name: '黄瓜',
              value: '3200'
            }
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
        const tag = idx % 6
        this.echarsData.push({
          name: item.name,
          value: item.value,
          itemStyle: {
            // borderRadius: '50%',
            // 颜色渐变
            color: {
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: this.gradientColor[tag][0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: this.gradientColor[tag][1] // 100% 处的颜色
                }
              ]
            }
          }
        })
        this.legendDate.push(item.name)
      })
      this.$nextTick(() => {
        this.renderingEcharts(data)
      })
    },
    //  渲染图表
    renderingEcharts() {
      this.echartsDom = echarts.init(this.$refs.pieTwoRef)
      // this.echartsDom = echarts.init(document.getElementById('pieTwo'))
      this.options.color = this.color
      this.options.series[0].label.rich = this.getRich()
      this.options.series[0].data = this.echarsData
      this.echartsDom.setOption(this.options)
    },

    getRich(){
      const result = {}
      this.legendDate.forEach((_, i) => {
        const colorIdx = i % 6
        result[`a${i}`] = {
          color: '#fff',
          fontSize: 13
        }
        result[`b${i}`] = {
          color: this.color[colorIdx],
          fontSize: 13,
          fontWeight: 400,
          padding: [0, 0, 0, 0]
        }
      })
      return result
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
