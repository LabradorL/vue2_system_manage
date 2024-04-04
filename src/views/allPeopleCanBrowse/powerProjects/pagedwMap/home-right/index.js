import comTitle from '../../components/com-title/com-title.vue'
// import homApi from '@/api/home'

// import rightDtuDialog from '../right-dtu-list-dialog/index.vue' // 遥控实验终端数的弹框
// import remoteControlReport from '../remote-control-report/index.vue'// 遥控试验弹框信息
// import remoteSwitch from '../remote-switch/index.vue'// 已遥控开关列表弹框信息
export default {
  components: { comTitle },
  data() {
    return {
      // 具备遥控功能的终端 - 统计
      rightTwoCountObj: {},
      // 线路异常区域分析
      lineAbnormalOptions: [],
      lineAbnormalList: [],
      lineTotal: 0,
      startTime: '',
      endTime: '',
      orgId: '',
      funcType: '',
      rightHint1Show:false,
      rightHint2Show:false
    }
  },
  mounted() {},
  methods: {
    showTips(type) {
      if (type === 1) {
        this.rightHint1Show = true
        return
      } else if (type === 2) {
        this.rightHint2Show = true
        return
      }
    },
    init(startTime, endTime, orgId, funcType) {
      this.startTime = startTime
      this.endTime = endTime
      this.orgId = orgId
      this.funcType = funcType
      const params = {
        orgId: this.orgId,
        funcType: this.funcType
      }
      // 获取 具备遥控功能的终端 - 统计
      this.getHaveTransferCount(params)
      // 获取线路异常区域分析数据
      this.getLineAnomalies()
    },

    // 具备遥控功能的终端 - 统计
    getHaveTransferCount(params) {
      const data = {
        total: 10282,
        dtuCount: 2905,
        ftuCount: 7377,
        dtuPercent: 28.25,
        ftuPercent: 71.75
      }
      this.rightTwoCountObj = data
      this.functionalTerminalEchart(data)
      // this.$axios
      //   .post(homApi.analyse.haveTransferCount, params)
      //   .then(({ code, data }) => {
      //     if (code === 200) {
      //       this.rightTwoCountObj = data
      //       this.functionalTerminalEchart(data)
      //     }
      //   })
    },
    // 具备遥控功能的终端 - 图表渲染
    functionalTerminalEchart(originData) {
      const echartData = [{ name: 'FTU', value: originData.ftuCount }, { name: 'DTU', value: originData.dtuCount }]
      const myChart = this.$echarts.init(
        document.getElementById('functionalTerminalEchart')
      )
      const trafficWay = echartData
      const sum = this.rightTwoCountObj.total || 0
      const gap = Number(sum) / 100
      // console.log('gap',gap);
      const data = []
      const color = ['#23C4FD', '#FDC345']
      for (let i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              borderRadius: '100%',
              borderColor: color[i],
              borderWidth: 0
            }
          },
          {
            value: gap,
            name: '',
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        )
      }
      console.log(data)
      const option = {
        color: color,
        legend: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['75%', '85%'],

            label: {
              show: false,
              position: 'center'
            },
            data: data
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    // 获取线路异常区域分析数据
    getLineAnomalies() {
      const param = {
        orgId: this.orgId,
        endDate: this.endTime,
        startDate: this.startTime,
        funcType: this.funcType,
        isNow: '0'
      }
      console.log('线路异常参数', param)
      this.lineAbnormalList = [{
        shortName: '银川',
        num: 123
      }, {
        shortName: '吴忠',
        num: 123
      }, {
        shortName: '石嘴山',
        num: 123
      }, {
        shortName: '中卫',
        num: 123
      }, {
        shortName: '宁东',
        num: 123
      }, {
        shortName: '固原',
        num: 123
      }]
      this.lineTotal = this.lineAbnormalList.reduce((sum, currentItem) => { return sum + currentItem.num }, 0)
      // this.$axios.post(homApi.getLineAreaStatistic, param).then(({ code, data }) => {
      //   if (code == 200 && data) {
      //     console.log(data)
      //     this.lineAbnormalList = data
      //     this.lineTotal = data.reduce((sum, currentItem) => { return sum + currentItem.num }, 0)
      //   }
      // })
    },
    // 打开弹框
    openTableDialog(dialogType, terminalType, controlledType) {
      // dialogType 弹框类型
      // terminalType 终端类型 0 全部 1 FTU 2 DTU
      // controlledType 1 遥控次数 0 未遥控次数
      switch (dialogType) {
        // 遥控指标统计
        case 0:
          break
        // 具备遥控功能的终端
        case 1:
          this.$refs.rightDtuDialog.openDialog(
            this.startTime,
            this.endTime,
            this.orgId,
            this.funcType,
            terminalType
          )
          break
        // 遥控实验终端数（年度）
        case 2:
          this.$refs.rightDtuDialog.openDialog(
            this.startTime,
            this.endTime,
            this.orgId,
            this.funcType,
            terminalType,
            controlledType
          )
          break
        case 3:

          this.$refs.remoteControlReport.openDialogInit(
            this.startTime,
            this.endTime,
            this.orgId,
            this.funcType
          )
          break
        case 4:

          this.$refs.remoteSwitch.openDialogInit(
            this.startTime,
            this.endTime,
            this.orgId,
            this.funcType
          )
          break
        default:
          break
      }
    }
  }
}
