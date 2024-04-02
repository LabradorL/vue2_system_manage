import comTitle from '../../components/com-title/com-title.vue'
export default {
  components: { comTitle },
  data() {
    return {
      startTime: '',
      endTime: '',
      funcType: '', // 组织机构层级
      orgId: '', //  组织机构id
      equipmentScaleTipsShow: false // 设备规模提示框是否显示
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
    // 获取数据
    getData() {},
    // 显示报表
    showReport() {
    },
    // 显示提示
    showTips(type) {
      if (type == 1) {
        this.equipmentScaleTipsShow = true
        return
      }
    }
  }
}
