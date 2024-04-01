import comTitle from '../../components/com-title/com-title.vue'
// import homeApi from '@/api/home.js' // 首页结构
// import lineTableDialog from '../left-line-table-dialog/index.vue' // 线路异常分析弹框
// import fusionTerminalTableDialog from '../left-influence-table-dialog/index.vue' // 融合终端配变异常分析弹框
export default {
  components: { comTitle },
  data() {
    return {
      startTime: '',
      endTime: '',
      activeOrgId: '',
      activeFuncType: '',
      lineAbnormalInfo: {
        total: '',
        nowNum: '',
        overloadLine: { total: '', nowNum: '' },
        heavyoadLine: { total: '', nowNum: '' }
      }, // 线路异常数据
      terminalAbnormalInfo: {
        total: '',
        nowNum: '',
        overloadLine: { total: '', nowNum: '' },
        heavyoadLine: { total: '', nowNum: '' },
        lowPowerLine: { total: '', nowNum: '' },
        threePhaseLine: { total: '', nowNum: '' }
      }, // 配变异常数据
      lineAbnormalTips: false, // 线路异常提示框
      terminalAbnormalTips: false // 配变异常提示框
    }
  },
  watch: {},
  computed: {},
  methods: {
    init(startTime, endTime, orgId, funcType) {
      this.startTime = startTime
      this.endTime = endTime
      this.activeOrgId = orgId
      this.activeFuncType = funcType
      this.getData()
    },
    // 获取数据
    getData(){
      this.getLineAbnormalAnalysis()
      this.getTerminalAbnormalAnalysis()
    },
    // 获取线路异常分析数据
    getLineAbnormalAnalysis() {
      const params = {
        startDate: this.startTime,
        endDate: this.endTime,
        funcType: this.activeFuncType,
        orgId: this.activeOrgId
      }
      // this.$axios.post(homeApi.getLineTypeStatistic, params).then(({ code, data }) => {
      //   if (code === 200 && data) {
      //     this.lineAbnormalInfo = data
      //   }
      // })
    },
    // 获取融合终端配变异常分析数据
    getTerminalAbnormalAnalysis() {
      const params = {
        startDate: this.startTime,
        endDate: this.endTime,
        funcType: this.activeFuncType,
        orgId: this.activeOrgId
      }
      // console.log(params)
      // this.$axios.post(homeApi.getTerminalTypeStatistic, params).then(({ code, data }) => {
      //   if (code === 200 && data) {
      //     this.terminalAbnormalInfo = data
      //   }
      // })
    },
    // 打开弹框
    openTable(deviceType, type, dataType) {
      // deviceType 设备类型 --->  线路line 配变terminal
      // type 异常类型 ---> 过载1 重载2 三相不平衡3 低电压5 全部 '1,2,3,4'
      // dataType 数据类型 ---> 总数0 当前1
      switch (deviceType) {
        case 'line': // 线路异常分析
          this.$refs.lineTableDialog.dialogShow = true
          this.$refs.lineTableDialog.openDialogInit(
            '线路异常列表',
            type,
            dataType,
            this.activeOrgId,
            this.activeFuncType,
            this.startTime,
            this.endTime
          )
          break
        case 'terminal': // 融合终端配变异常分析
          this.$refs.influenceTqTableDialog.dialogShow = true
          this.$refs.influenceTqTableDialog.openDialogInit(
            '配变异常列表',
            type,
            dataType,
            this.activeOrgId,
            this.activeFuncType,
            this.startTime,
            this.endTime
          )
          break
      }
    },
    // 地图打点
    gisMap(row) {
      this.$emit('gisMap', row)
    },
    // 显示提示框
    showTips(type) {
      this[type] = true
    }
  }
}
