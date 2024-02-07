<template>
  <div id="diversionAnalysis" @click="barClick">
    <!-- 顶部查询 -->
    <homeHead
      ref="homeHead"
      :func-type="activeFuncType"
      :org-id="activeOrgId"
      @dateChange="dateChange"
      @activeArea="activeArea"
    />
    <div class="center-box">
      <div class="cener-top">
        <!-- 中间地图 -->
        <mapEchart ref="mapEchart" />
        <!-- 中间地图的右边 -->
        <center-right ref="centerRight" />
        <!-- 中间地图的左边 -->
        <center-left ref="centerLeft" />
      </div>
      <center-botton ref="centerBottom" />
    </div>
    <!-- 左侧看板 -->
    <home-left ref="homeLeft" />
    <!-- 右侧看板 -->
    <home-right ref="homeRight" />
  </div>
</template>
<script>
import mapEchart from './components/map/map.vue'
import homeLeft from './components/home-left/index.vue'
import homeRight from './components/home-right/index.vue'
import centerRight from './components/home-center/center-right.vue'
import centerLeft from './components/home-center/center-left.vue'
import centerBotton from './components/home-center/center-bottom.vue'
import homeHead from './components/home-head/index.vue'
import moment5 from 'moment'
export default {
  name: 'LargeScreenOne',
  components: {
    homeLeft,
    mapEchart,
    homeRight,
    centerRight,
    centerBotton,
    homeHead,
    centerLeft
  },
  data() {
    return {
      startTime: this.$moment().startOf('month').format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
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
    // 时间切换
    dateChange(time) {
      if (time === 'Invalid date') {
        this.startTime = ''
        this.endTime = ''
      }
      this.startTime = time[0]
      this.endTime = time[1]
      // 重新刷新看板数据
      this.initBoard()
    },
    // 获取看板数据
    initBoard() {
      this.$refs.homeLeft.init(
        this.activeOrgId,
        this.activeFuncType,
        this.startTime,
        this.endTime
      )
      this.$refs.homeRight.init(
        this.activeOrgId,
        this.activeFuncType,
        this.startTime,
        this.endTime
      )
      this.$refs.centerBottom.init(
        this.activeOrgId,
        this.activeFuncType,
        this.startTime,
        this.endTime
      )
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
      const closeDomList = [
        { domId: 'hintFaultLine', domFlag: 'faultLineTipsShow', childRef:'homeLeft' },
        { domId: 'hintSpecialAttention', domFlag: 'attentionTipsShow', childRef:'homeLeft' }
      ]

      closeDomList.forEach(item => {
        const dom = document.getElementById(item.domId)
        if (dom) {
          if (!dom.contains(event.target)) {
            this.$refs[item.childRef][item.domFlag] = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#diversionAnalysis {
  width: 100%;
  min-width: 1645px;
  height: 100%;
  padding: 20px;
  background: url("./imgs/home/home-box-bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .body-box {
  width: 100%;
  height: 100%;
}
.center-box {
  width: calc(100% - 840px - 32px);
  height: 100%;
  .cener-top {
    position: relative;
    width: 100%;
    height: calc(100% - 194px);
    #mapEchart {
      height: 100%;
      width: 100%;
    }
  }
}
.center-box ::v-deep .center-bottom-box {
  .cont-title-head {
    background: url("./imgs/common/item_module_bg2.png") no-repeat;
    background-size: 100% 100%;
    background-position-y: 100%;
  }
}
::v-deep #diversion-analysis-right {
  .right-one {
    .cont-title-head-left {
      color: red;
      width: 50%;
    }
  }
}

::v-deep .hint-common {
  position: absolute;
  top: 20px;
  width: 360px;
  height: auto;
  background: #021736;
  box-shadow: inset 0px 0px 20px 0px rgba(35, 196, 253, 0.5);
  z-index: 666;
  border-radius: 10px;
  padding: 20px;
  .hint-head {
    width: 100%;
    height: 14px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(180deg, #a3d4fa 0%, #1c9afa 100%);
      margin-right: 8px;
    }
  }
  .hint-text {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    color: #ccd0d4;
    line-height: 24px;
  }
  .hint-text2 {
    background: linear-gradient(
      180deg,
      rgba(0, 155, 255, 0) 0%,
      rgba(0, 155, 255, 0.05) 100%
    );
    border: 1px solid;
    border-image: linear-gradient(
        180deg,
        rgba(0, 155.00000596046448, 255, 0.4000000059604645),
        rgba(0, 155.00000596046448, 255, 0),
        rgba(0, 155.00000596046448, 255, 0)
      )
      1 1;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 400;
    color: #ccd0d4;
    line-height: 24px;
    padding: 16px;
    padding-bottom: 0px;
    span {
      color: #23c4fd;
    }
    p {
      margin-top: 16px;
    }
    p:nth-child(1) {
      margin-top: 0px;
    }
  }
}
</style>
