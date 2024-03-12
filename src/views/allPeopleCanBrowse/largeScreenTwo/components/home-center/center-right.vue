<template>
  <div class="center-right">
    <!-- 在线率 -->
    <div class="online-rate">
      <div class="online-rate-item">
        <p class="right-three-name">FTU在线率</p>
        <img
          src="../../imgs/common/icon-monitor-bottom-bg.png"
          alt=""
        >
        <p class="right-three-num">32.43<span>%</span></p>
      </div>
      <div class="online-rate-item">
        <p class="right-three-name">DTU在线率</p>
        <img
          src="../../imgs/common/icon-monitor-bottom-bg.png"
          alt=""
        >
        <p class="right-three-num">32.43<span>%</span></p>
      </div>
      <div class="online-rate-item">
        <p class="right-three-name">融合终端在线率</p>
        <img
          src="../../imgs/common/icon-monitor-bottom-bg.png"
          alt=""
        >
        <p class="right-three-num">32.43<span>%</span></p>
      </div>
      <div class="online-rate-item">
        <p class="right-three-name">故指在线率</p>
        <img
          src="../../imgs/common/icon-monitor-bottom-bg.png"
          alt=""
        >
        <p class="right-three-num">32.43<span>%</span></p>
      </div>
    </div>
    <!-- 图例 -->
    <div class="map-legend">
      <div class="map-legend-head">负荷MW</div>
      <div class="map-legend-body">
        <div class="map-legend-li">
          <span />
          <p>>1000</p>
        </div>
        <div class="map-legend-li">
          <span />
          <p>500-1000</p>
        </div>
        <div class="map-legend-li">
          <span />
          <p>200-500</p>
        </div>
        <div class="map-legend-li">
          <span />
          <p>100-200</p>
        </div>
        <div class="map-legend-li">
          <span />
          <p>&lt;100</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'CenterRight',
  // 局部注册的组件
  components: {},
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
    // 获取数据
    getData() {}
  }
}
</script>

<style lang="scss" scoped>
.center-right {
  width: 111px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 44;
  .online-rate {
    width: 100%;
    margin-left: 10px;
    .online-rate-item {
      width: 101px;
      height: 100%;
      position: relative;
      margin-bottom: 19px;
      img {
        width: 100%;
        height: auto;
      }
      .right-three-name {
        width: 100%;
        height: 14px;
        line-height: 14px;
        text-align: center;
       color: #fff;
        font-size: 14px;
        margin-top: 7px;
        font-weight: 700;
        font-family: Source Han Sans-Medium;
        font-weight: 500;
      }
      .right-three-num {
        position: absolute;
        top: 25px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-family: PangMenZhengDao;
        font-weight: 400;
        color:#23c4fd;
        cursor: pointer;
        span {
          font-size: 10px;
          margin-left: 2px;
        }
      }
    }
  }
  .map-legend {
    width: 100%;
    height: 194px;
    position: absolute;
    right: 0px;
    bottom: 16px;
    background: rgba(35, 196, 253, 0.1);
    z-index: 999;
    box-sizing: border-box;
    // display: none;
    .map-legend-head {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: url("../../imgs/home/icon-map-legend-head.png");
      background-size: 100% 100%;
      font-size: 16px;
      font-family: PangMenZhengDao;
      font-weight: 400;
     color: #fff;
      padding: 0 16px;
    }
    .map-legend-body {
      width: 100%;
      height: 164px;
      padding: 11px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .map-legend-li {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular;
      font-weight: 400;
     color: #fff;
      span {
        width: 11px;
        height: 11px;
        opacity: 1;
        border-radius: 50%;
        margin-right: 12px;
        position: relative;
        // border: 3px solid;
      }
    }
   .map-legend-li:nth-child(1) span {
      background: #fdc345;
    }
    .map-legend-li:nth-child(2) span {
      background: #367cff;
    }
    .map-legend-li:nth-child(3) span {
      background: #00ffd5;
    }
    .map-legend-li:nth-child(4) span {
      background: #1061ff;
    }
    .map-legend-li:nth-child(5) span {
      background: #18587d;
    }
  }
}
</style>
