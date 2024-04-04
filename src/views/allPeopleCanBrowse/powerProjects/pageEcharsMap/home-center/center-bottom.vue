<template>
  <div class="center-bottom-box">
    <com-title title-name="运行趋势">
      <div slot="headRight" class="head-right-box" @click="getMore">
        <p class="head-right-unit">更多</p>
        <img src="../../imgs/common/more.png" alt="" class="more">
      </div>
      <div slot="titleBody" class="body-box">
        <div class="center-bottom-left">
          <div class="center-bottom-item">
            <p class="center-bottom-item-name">实时总负荷</p>
            <p class="center-bottom-item-num">
              <span class="num">31194</span>
              <span>kW</span>
            </p>
          </div>
          <div class="center-bottom-item">
            <p class="center-bottom-item-name">最大负荷</p>
            <p class="center-bottom-item-num">
              <span class="num">31194</span>
              <span>kW</span>
            </p>
          </div>
          <div class="center-bottom-item">
            <p class="center-bottom-item-name">最小负荷</p>
            <p class="center-bottom-item-num">
              <span class="num">31194</span>
              <span>kW</span>
            </p>
          </div>
        </div>
        <div
          id="centerBottom"
          ref="centerBottom"
          class="center-bottom-echart"
        />
      </div>
    </com-title>
  </div>
</template>

<script>
import comTitle from '../../components/com-title/com-title.vue'
export default {
  // 组件名称
  name: 'CenterBottom',
  // 局部注册的组件
  components: { comTitle },
  // 组件状态值
  data() {
    return {
      startTime: '',
      endTime: '',
      funcType: '', // 组织机构层级
      orgId: '' //  组织机构id
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法
  methods: {
    // 初始化
    init(activeOrgId, activeFuncType, startTime, endTime) {
      this.orgId = activeOrgId
      this.funcType = activeFuncType
      this.startTime = startTime
      this.endTime = endTime
      this.getData()
    },
    getData() {
      this.getEcharts()
    },
    // 更多
    getMore() {
      console.log('获取更多信息')
    },
    getEcharts() {
      this.centerBottomEchart()
    },
    // 渲染运行趋势图表
    centerBottomEchart(xData, yData1, yData2) {
      xData = [
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
      ]
      yData1 = [
        '4000',
        '6000',
        '2200',
        '8700',
        '5000',
        '4000',
        '4000',
        '6000',
        '2200',
        '8500',
        '5000',
        '4000',
        '4000',
        '6000',
        '2200',
        '8500',
        '5000',
        '4000',
        '4000',
        '6000',
        '2200',
        '8500',
        '5000',
        '4000'
      ]
      yData2 = [
        '2000',
        '5000',
        '1200',
        '6500',
        '3000',
        '6000',
        '2000',
        '5000',
        '1200',
        '6500',
        '3000',
        '6000',
        '2000',
        '5000',
        '1200',
        '6900',
        '3000',
        '6000',
        '2000',
        '5000',
        '1200',
        '7500',
        '3000',
        '6000'
      ]
      const myChart = this.$echarts.init(document.getElementById('centerBottom'))
      const markPointYesterday = [
        {
          name: '最大值',
          value: 8700,
          xAxis: '4:00',
          yAxis: 8700,
          label: {
            formatter: '昨日最大值：' + 8700,
            with: 140,
            padding: [10, 10],
            offset: [0, -23],
            fontWeight: 700,
            // position: 'left',
            color: '#FDC345',
            backgroundColor: {
              image: require('../../imgs/home/echart-max-yellow.png')
            }
          },
          symbolSize: [18, 20]
        }
      ]
      const markPointToday = [
        {
          name: '最大值',
          value: 7500,
          xAxis: '22:00',
          yAxis: 7500,
          label: {
            formatter: '今日最大值：' + 7500,
            with: 140,
            padding: [10, 10],
            offset: [0, 25],
            fontWeight: 700,
            // position: 'left',
            color: '#23C4FD',
            backgroundColor: {
              image: require('../../imgs/home/echart-max-blue.png')
            }
          },
          symbolSize: [20, 18]
        }
      ]
      const option = {
        color: ['#FDC345', '#23C4FD'],
        grid: {
          top: '50',
          bottom: '20',
          left: '50',
          right: '10'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今日', '昨日'],
          textStyle: {
            fontSize: 14,
            color: '#CCD0D4'
          },
          rich: {
            a: {
              fontSize: 14,
              color: '#CCD0D4'
            },
            b: {
              fontSize: 20,
              color: '#17CEFC'
            },
            c: {
              fontSize: 20,
              color: '#367CFF'
            }
          },
          backgroundColor: 'transparent'
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              width: 1
            }
          },
          axisTick: {
            show: false // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#808F9C', // X轴文字颜色
              fontSize: 12
            }
          },
          splitArea: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'MW',
            nameTextStyle: {
              color: '#CCD0D4',
              fontSize: 10,
              padding: [0, -10, 0, -50] // 四个数字分别为上右下左与原位置距离
            },
            // 网格线
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#202E51'
              }
            },
            splitNumber: 3,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#26D9FF',
                width: 2
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#CCD0D4',
                fontSize: 10
              }
            }
          }
        ],
        series: [
          {
            name: '昨日',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 0, // 标记的大小
            data: yData1,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            markPoint: {
              data: markPointYesterday
            }
          },
          {
            name: '今日',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 0, // 标记的大小
            data: yData2,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            markPoint: {
              data: markPointToday
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.center-bottom-box {
  width: 100%;
  height: 194px;
  .body-box {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
  .head-right-box {
    display: flex;
    align-items: center;
    .head-right-unit {
      margin-right: 5px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei;
      font-weight: 400;
      color: #23c4fd;
    }
  }

  .center-bottom-left {
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    .center-bottom-item {
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: space-between;
      font-family: PangMenZhengDao;
      font-size: 14px;
     color: #fff;
      background: url("../../imgs/home/center_bottom_bg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 36px;
      margin-bottom: 9px;
      padding: 0 16px;
      .center-bottom-item-name {
        text-align: left;
        font-family: Microsoft YaHei;
      }
      .num {
        font-size: 20px;
        color: #23c4fd;
        margin-right: 3px;
      }
    }
    .center-bottom-item:nth-child(2) {
      .num {
        color: #66ffcc;;
      }
    }
    .center-bottom-item:nth-child(3) {
      .num {
        color: #367cff;;
      }
    }
  }
  .center-bottom-echart {
    width: calc(100% - 220px);
    height: 100%;
    position: relative;
  }
}
.center-bottom-box ::v-deep .cont-title-body {
  padding: 16px 20px 7px;
}
</style>
