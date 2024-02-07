import comTitle from '../com-title/com-title.vue'
export default {
  components: { comTitle },
  data() {
    return {
      startTime: '',
      endTime: '',
      funcType: '', // 组织机构层级
      orgId: '', //  组织机构id
      attentionTipsShow: false, // 繁发生故障线路提示框是否显示
      faultLineTipsShow: false // 特别关注提示框是否显示
    }
  },

  mounted() {},
  methods: {
    // 初始化
    init(activeOrgId, activeFuncType, startTime, endTime) {
      this.orgId = activeOrgId
      this.funcType = activeFuncType
      this.startTime = startTime
      this.endTime = endTime
      this.getData()
    },
    // 获取数据
    getData() {},
    // 显示报表
    showReport() {},
    // 显示提示
    showTips(type) {
      if (type == 1) {
        this.faultLineTipsShow = true
        return
      }
      if (type == 2) {
        this.attentionTipsShow = true
        return
      }
    }
  }
}
