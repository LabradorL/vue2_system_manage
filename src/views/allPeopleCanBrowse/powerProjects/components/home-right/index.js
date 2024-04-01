import comTitle from '../com-title/com-title.vue'
export default {
  components: { comTitle },
  data() {
    return {
      // 图表配置
      barOption: {
        color: ['#367CFF', '#00EAFF', '#367CFF', '#00EAFF'],
        grid: {
          top: '  70px',
          bottom: '20px',
          left: '50px',
          right: '20px'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0,
          formatter: function(params) {
            let html = `<div class='tooltipBox'><p class='tooltip-head'>${params[0].name}</p>`
            params.forEach((item) => {
              html +=
                `<div class='tooltip-li'><p class='tooltip-li-left'>${item.marker}${item.seriesName}</p>` +
                `<p class='tooltip-li-num' style='color:${item.color}'>${item.value}</p></div>`
            })
            html += `</div>`
            return html
          }
        },

        legend: {
          type: 'plain',
          top: 0,
          textStyle: {
            color: '#CCD0D4',
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
          },
          itemWidth: 11,
          itemHeight: 11,
          itemGap: 20,
          data: [
            {
              name: '故障停电',
              itemStyle: {
                color: '#FDC345'
              }
            },
            {
              name: '临时停电',
              itemStyle: {
                color: '#00FFD5'
              }
            },
            {
              name: '计划停电',
              itemStyle: {
                color: '#367CFF'
              }
            }
          ]
        },
        xAxis: {
          data: [],
          type: 'category',
          // boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#202E51'
            }
          },
          // data: timeData,
          axisTick: {
            show: false
          },
          lineStyle: {
            color: '#202E51'
          },
          axisLabel: {
            color: '#CCD0D4'
          }
        },
        yAxis: {
          name: '次',
          nameTextStyle: {
            padding: [0, -10, 0, -35], // 四个数字分别为上右下左与原位置距离
            color: '#ffffff'
          },
          minInterval: 1,
          type: 'value',
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted',
              color: '#202E51'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          // symbol: "none",
          axisLabel: {
            color: '#CCD0D4'
          }
        },
        series: []
      },
      funcType: '', // 组织机构层级
      orgId: '', //  组织机构id
      faultLineTipsShow: false // 繁发生故障线路提示框是否显示
    }
  },
  mounted() {},
  methods: {
    // 初始化
    init(activeOrgId, activeFuncType) {
      this.orgId = activeOrgId
      this.funcType = activeFuncType
      this.getData()
    },
    getData() {
      this.getEcharts()
    },
    // 获取图表数据
    getEcharts() {
      this.rightTopEchart()
    },
    // 渲染停电分析图表
    rightTopEchart(xData, yData1, yData2, yData3) {
      xData = ['停电总数', '当前停电']
      yData1 = [120, 75, 190]
      yData2 = [102, 130, 175]
      yData3 = [200, 130, 275]
      const that = this
      const myChart = that.$echarts.init(that.$refs.rightTop)
      const option = that.barOption
      option.xAxis.data = xData
      const seriesData = [
        {
          name: '故障停电',
          type: 'bar',
          barWidth: 16,
          barGap: 0.5,
          data: yData1,
          label: {
            show: true,
            position: 'top',
            formatter: '{a|{c}}',
            rich: {
              a: {
                color: '#FDC345',
                fontSize: 16,
                align: 'center',
                fontFamily: 'DIN-Bold'
              }
            }
          },
          itemStyle: {
            color: '#FDC345'
            // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: "rgba(253,195,69,0.8)",
            //   },
            //   {
            //     offset: 1,
            //     color: "rgba(253,195,69,0.2)",
            //   },
            // ]),
          }
        },
        {
          name: '临时停电',
          type: 'bar',
          barWidth: 16,
          data: yData2,
          label: {
            show: true,
            position: 'top',
            formatter: '{a|{c}}',
            rich: {
              a: {
                color: '#00FFD5',
                fontSize: 16,
                align: 'center',
                fontFamily: 'DIN-Bold'
              }
            }
          },
          itemStyle: {
            color: '#00EAFF'
            // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0.3,
            //     color: "rgba(0,255,213,0.8)",
            //   },
            //   {
            //     offset: 1,
            //     color: "rgba(0,255,213,0.2)",
            //   },
            // ]),
          }
        },
        {
          name: '计划停电',
          type: 'bar',
          barWidth: 16,
          data: yData3,
          label: {
            show: true,
            position: 'top',
            formatter: '{a|{c}}',
            rich: {
              a: {
                color: '#367CFF',
                fontSize: 16,
                align: 'center',
                fontFamily: 'DIN-Bold'
              }
            }
          },
          itemStyle: {
            color: '#367CFF'
            // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: "rgba(54,124,255,0.8)",
            //   },
            //   {
            //     offset: 1,
            //     color: "rgba(54,124,255,0.2)",
            //   },
            // ]),
          }
        }
      ]
      option.series = seriesData
      myChart.clear()
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    // 更多
    getMore(type) {
      switch (type) {
        case 'powerFailure':
          console.log('停电分析（今日）')
          break
        case 'abnormalAnalysis':
          console.log('异常分析（今日）')
          break
        case 'faultLine':
          console.log('频繁发生故障线路')
          break
        default:
          console.log('无匹配内容')
      }
    },
    // 显示提示
    showTips(type) {
      if (type == 1) {
        this.faultLineTipsShow = true
        return
      }
    }
  }
}
