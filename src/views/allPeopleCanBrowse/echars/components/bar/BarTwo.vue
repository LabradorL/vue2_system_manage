<template>
  <div class="echarts-box">
    <template v-if="hasData">
      <div class="data-box">
        <div id="BarTwo" ref="BarTwoRef" class="echarts-content" />
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
  name: 'BarTwo',
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
      options:  {
        grid: {
          top: '20%',
          left: 50,
          right: 30,
          bottom: 45
        },
        // dataZoom: [
        //   {
        //     type: 'slider', // 隐藏或显示（true）组件
        //     show: true,
        //     backgroundColor: 'rgb(19, 63, 100)', //  组件的背景颜色。
        //     fillerColor: 'rgb(16, 171, 198)', //  选中范围的填充颜色。
        //     borderColor: '#fff', //  边框颜色
        //     showDetail: false, // 是否显示detail，即拖拽时候显示详细数值信息
        //     // startValue: 0,
        //     // endValue: 1,
        //     filterMode: 'empty',
        //     width: '90%', // 滚动条范围宽度
        //     height: 0, // 滚动条高度
        //     left: 'center',
        //     zoomLoxk: true, //  是否锁定选择区域（或叫做数据窗口）的大小
        //     handleSize: '110%', // 控制手柄的尺寸
        //     bottom: 8, //  dataZoom-slider组件离容器下侧的距离
        //     // start: 0, //  移动手柄的尺寸位置
        //     // end:100,
        //     // minSpan: 10,
        //     moveHandleIcon: 'none', // 移动手柄中间icon
        //     maxValueSpan: 7, // x轴类目数  最多14个  超出显示缩放组件dataZoom
        //     moveHandleSize: 8, // 移动手柄的尺寸高度。
        //     // 移动手柄的样式
        //     moveHandleStyle: {
        //       color: '#ddd'
        //     },
        //     // 高亮样式设置
        //     emphasis: {
        //     // 移动手柄的样式
        //       moveHandleStyle: {
        //         color: '#ddd'
        //       }
        //     }
        //   },
        //   {
        //     // 没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
        //     type: 'inside',
        //     zoomOnMouseWheel: false, // 滚轮是否触发缩放
        //     moveOnMouseMove: true, // 鼠标滚轮触发滚动
        //     moveOnMouseWheel: true
        //   }
        // ],
        dataZoom: [{
          show: true,
          type: 'slider',
          height:0, // 滚动条高度
          maxValueSpan: 7, // x轴类目数  最多7个  超出显示缩放组件dataZoom
          moveHandleSize: 8, // 移动手柄的尺寸高度。
          bottom:10, //  dataZoom-slider组件离容器下侧的距离
          backgroundColor: 'rgb(19, 63, 100)', //  组件的背景颜色。
          // backgroundColor: 'rgb(255, 255, 100)', //  组件的背景颜色。
          fillerColor: 'rgb(16, 171, 198)', //  选中范围的填充颜色。
          showDetail: false, // 是否显示detail，即拖拽时候显示详细数值信息
          // 数据窗口范围的起始数值 可以是数组下标，也可以是数组本身的值
          // start: 10,
          // 数据窗口范围的结束数值 可以是数组下标，也可以是数组本身的值
          // end: 60,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle:{ color:'#d3dee5' },
          textStyle:{ color:'#fff' },
          borderColor:'transparent',
          // 移动手柄的样式
          moveHandleStyle: {
            color: '#ddd'
          },
          // 高亮样式设置
          emphasis: {
            // 移动手柄的样式
            moveHandleStyle: {
              color: '#ddd'
            }
          }

        },
        {
          type: 'inside',
          zoomOnMouseWheel: false, // 滚轮是否触发缩放
          moveOnMouseMove: true, // 鼠标滚轮触发滚动
          moveOnMouseWheel: true
        }
        ],
        tooltip: {
          trigger: 'axis',
          show: true,
          padding: 5,
          borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,.6)',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(53, 142, 254, .1)',
              width: 40,
              type: 'solid'
            }
          }, // 触发效果 移动上去 背景效果

          textStyle: {
            color: '#fff'
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
          icon: 'rect',
          orient: 'horizontal',
          top: '13.5',
          right: '17%',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 20,
          textStyle: {
            color: '#FFFFFF',
            // color: '#4E5969',
            fontSize: 12
          }
        },
        xAxis: [
          {
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
            // 坐标轴刻度标签的相关设置
              show: true, // 是否展示坐标轴label
              color: '#fff',
              fontSize: 12,
              interval: 'auto'
            },
            // axisLabel: {
            //     padding: [0, 0, 0, -20]    // 四个数字分别为上右下左与原位置距离
            // },
            type: 'category',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
          }
        ],
        yAxis: [
          {
            name: '数量',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 14,
              align: 'right'
            },
            type: 'value',

            min: 0,
            axisLabel: {
            // 坐标轴刻度标签的相关设置
              show: true, // 是否展示坐标轴label
              color: '#fff',
              fontSize: 12,
              formatter: '{value}' // 格式化label
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,0,0,0.5)'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            name: '占比(%)',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 14
            },
            type: 'value',

            min: 0,
            axisLabel: {
            // 坐标轴刻度标签的相关设置
              show: true, // 是否展示坐标轴label
              color: '#fff',
              fontSize: 12,
              formatter: '{value}' // 格式化label
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,0,0,0.5)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['rgba(109,133,185,0.3)'], // 线条颜色
                // width: 1,
                type: 'dashed' // 线条样式，默认是实现，dashed是虚线
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '水果数量',
            type: 'bar',
            barWidth: '12',
            // barGap:10,
            color: '#247FFF',
            data: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149],
            itemStyle: {
              color: '#358EFE'
            },
            emphasis: {
              disabled: true,
              focus: 'none'
            }
          },
          {
            // 使用右Y轴， 0是左Y轴，默认的是0
            yAxisIndex: 1,
            name: '水果占比',
            type: 'bar',
            barWidth: '12',
            // barGap:10,
            color: '#247FFF',
            data: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249],
            itemStyle: {
              color: '#12C2C1'
            },
            emphasis: {
              disabled: true,
              focus: 'none'
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
      this.echartsDom = echarts.init(this.$refs.BarTwoRef)
      // this.echartsDom = echarts.init(document.getElementById('BarTwo')
      this.options.color = this.color
      // this.options.xAxis.data = this.xAxisData
      // this.options.series[0].data = this.echarsData
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
