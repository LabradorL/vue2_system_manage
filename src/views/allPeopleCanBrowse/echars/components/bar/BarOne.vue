<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box">
        <div id="barOne" ref="barOneRef" class="echarts-content" />
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
  name: 'BarOne',
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
      color: ['#9E6DF8', '#4BEDC8', '#28B0B5', '#F89560', '#3361FD', '#EBBC36'],
      // 图表配置
      options: {
        color: [],
        grid: {
          top: '20%',
          left: 50,
          right: 30,
          bottom: '21%'
        },
        xAxis: {
          type: 'category',
          data: [],
          // x轴文字相关配置
          axisLabel: {
            interval: 0,
            rotate: 20, // 文字倾斜程度
            color: '#FFF' // 文字颜色
          },
          // 轴线的相关配置
          axisLine: {
            show: true, // 是否显示坐标轴线
            // 轴线的样式配置
            lineStyle: {
              color: '#3FDDFF'
            },
            symbol: ['none', 'arrow'],
            symbolSize: [8, 8]
          },
          axisTick: {
            show: false // 不显示坐标轴刻度线
          },
          splitLine: {
            show: false // 不显示网格线
          }
        },
        yAxis: {
          // x轴文字相关配置
          axisLabel: {
            color: '#FFF' // 文字颜色
          },
          // 轴线的相关配置
          axisLine: {
            show: true, // 是否显示坐标轴线
            // 轴线的样式配置
            lineStyle: {
              color: '#3FDDFF'
            },
            symbol: ['none', 'arrow'],
            symbolSize: [8, 8]
          },
          axisTick: {
            show: false // 不显示坐标轴刻度线
          },
          splitLine: {
            show: false // 不显示网格线
          },
          name: '单位：万',
          nameTextStyle: {
            color: '#fff',
            fontSize: 13,
            fontfamily: 'SourceHanSansCN',
            padding: [0, 0, 5, -15]
          },
          max: function(value) {
            return Math.ceil(value.max + 0.1)
          }
        },
        tooltip: {
          // 触发类型 item | axis | none
          // item 数据项图形触发，如散点图、饼图等无类目轴的图表中使用
          // axis 坐标轴触发，如柱形图、折线图等类目轴的图表中使用
          trigger: 'axis',
          // 坐标指示器配置
          axisPointer: {
            // 指示器类型 shadow line cross none
            type: 'shadow'
          },
          formatter: function(params) {
            const { marker, name, value } = params[0]
            return `<div style="color:#666;font-size:14px"><span>${name}</span><br/>
                ${marker}<span style="font-weight: 900">${value || 0}w</span><br/></div>`
          }
        },
        series: [
          {
            // 系列名称，用于tooltip的显示
            name: '',
            // 类型
            data: [],
            type: 'bar',
            // barWidth: '50%', // 改变柱子的宽度
            // 不同系列的柱间距离
            barGap: 0,
            // 是否显示每一个柱状图的数据
            label: {
              show: true,
              color: '#fff',
              fontWeigth: 'bloder',
              position: 'top'
              // 标签文字格式化 string | Function
              // formatter: (params) => {
              //   console.log(params)
              //   return ''
              // }
            }
          }
        ]
      },
      // 图表元素
      echartsDom: '',
      // x轴信息
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
            { name: '涉企案件', allCount: 0, dataCount: 23843, ratio: 0 },
            { name: '社矫再犯罪', allCount: 0, dataCount: 56226, ratio: 0 },
            { name: '新业态场所未保', allCount: 0, dataCount: 23160, ratio: 0 },
            { name: '食药案件', allCount: 0, dataCount: 10136, ratio: 0 },
            { name: '涉车案件', allCount: 0, dataCount: 6722, ratio: 0 }
          ]
          this.dataList = res.data
          this.formatData(res.data)
        }
      })
    },
    //  数据进行处理
    formatData(data) {
      this.echarsData = data.map((item) => (item.dataCount / 10000).toFixed(2))
      this.xAxisData = data.map(item => item.name)
      this.$nextTick(() => {
        this.renderingEcharts()
      })
    },
    //  渲染图表
    renderingEcharts() {
      this.echartsDom = echarts.init(this.$refs.barOneRef)
      // this.echartsDom = echarts.init(document.getElementById('barOne')
      this.options.color = this.color
      this.options.xAxis.data = this.xAxisData
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
