<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box">
        <div id="pieThree" ref="pieThreeRef" class="echarts-content" />
        <div class="legend-box">
          <vue-seamless-scroll :data="dataList" :class-option="seamlessScrollOption">
            <div v-for="(item,index) in dataList" :key="item.name" class="legend-item">
              <div class="marker" :style="{ background: color[index % 6] }" />
              <div class="label" :title="item.name">{{ item.name }}</div>
              <div class="num">{{ item.dataCount }}</div>
            </div>
          </vue-seamless-scroll>
        </div>
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
  name: 'PieThree',
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
        title: [
          {
            text: '',
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: 20,
                  fontWeight: 'normal',
                  color: '#ffffff'
                },
                val: {
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#ffffff'
                }
              }
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            data:[],
            hoverAnimation: false,
            itemStyle: {
              borderColor: '#004759',
              borderWidth: 5
            },
            label: {
              show: false
            }
          }
        ] },
      // 图表元素
      echartsDom: '',
      seamlessScrollOption: {
        step: 0.7, // 数值越大速度滚动越快
        limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
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
          // res.data = [
          //   { name: '诈骗案', allCount:0, dataCount: 1, ratio: 0 },
          //   { name: '盗窃案', allCount:0, dataCount: 2, ratio: 0 },
          //   { name: '其他', allCount:0, dataCount: 4, ratio: 0 },
          //   { name: '监外执行（社区矫正）检察档案', allCount:0, dataCount: 1, ratio: 0 },
          //   { name: '危险驾驶案', allCount:0, dataCount: 3, ratio: 0 },
          //   { name: '食药品案', allCount:0, dataCount: 1, ratio: 0 },
          //   { name: '涉车案', allCount:0, dataCount: 2, ratio: 0 },
          //   { name: '绑架案', allCount:0, dataCount: 1, ratio: 0 }
          // ]
          this.dataList = res.data
          this.formatData(res.data)
        }
      })
    },
    //  数据进行处理
    formatData(data) {
      this.echarsData = data.map((item) => {
        return {
          name: item.name,
          value: item.dataCount
        }
      })
      this.$nextTick(() => {
        this.renderingEcharts()
      })
    },
    //  渲染图表
    renderingEcharts() {
      this.echartsDom = echarts.init(this.$refs.pieThreeRef)
      // this.echartsDom = echarts.init(document.getElementById('pieThree'))
      const total = this.echarsData.reduce((pre, next) => { return pre + Number(next.value) }, 0)
      // 千位分隔符函数
      const formatNumber = function(num) {
        const reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      this.options.color = this.color
      this.options.title[0].text = '{val|' + formatNumber(total) + '}\n{name|个}'
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
    width: 54%;
    height: 100%;
  }
}
</style>
