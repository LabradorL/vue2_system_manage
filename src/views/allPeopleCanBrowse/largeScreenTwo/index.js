import mapEchart from './components/map/map.vue'
import homeLeft from './components/home-left/index.vue'
import homeRight from './components/home-right/index.vue'
import centerRight from './components/home-center/center-right.vue'
import centerLeft from './components/home-center/center-left.vue'
import centerBottom from './components/home-center/center-bottom.vue'
import homeHead from './components/home-head/index.vue'
export default {
  components: {
    homeLeft,
    mapEchart,
    homeRight,
    centerRight,
    centerBottom,
    homeHead,
    centerLeft
  },
  data() {
    return {
      activeFuncType: '02', // 组织机构层级
      activeOrgId: '46e5838467ee47970167f27a7fa600c6' //  组织机构id
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initBoard()
    })
  },
  methods: {
    // 获取看板数据
    initBoard() {
      this.$refs.homeLeft.init(
        this.activeOrgId,
        this.activeFuncType
      )
      this.$refs.homeRight.init(
        this.activeOrgId,
        this.activeFuncType
      )
      this.$refs.centerBottom.init(
        this.activeOrgId,
        this.activeFuncType
      )
      // this.$refs.mapEchart.initMap('宁夏回族自治区',this.cityDataList,this.mapSection);
    },
    // 单位切换
    activeArea(data) {
      console.log('单位切换', data)
      const { id, type, lon, lat, shortName, orgID, sname } = item
      if (id) {
        this.activeOrgId = id
      } else {
        this.activeOrgId = orgID
      }
      this.activeFuncType = type
      // 重新刷新看板数据
      this.initBoard()
    },
    // 提示信息关闭
    barClick() {
      const hintFaultLine = document.getElementById('hintFaultLine')
      const equipmentScale = document.getElementById(
        'equipmentScale'
      )

      if (hintFaultLine) {
        if (!hintFaultLine.contains(event.target)) {
          this.$refs.homeRight.faultLineTipsShow = false
        }
      }
      if (equipmentScale) {
        if (!equipmentScale.contains(event.target)) {
          this.$refs.homeLeft.equipmentScaleTipsShow = false
        }
      }
    }
  }
}
