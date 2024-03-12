<template>
  <div class="center-left">
    <div v-for="item in typeList" :key="item.title" class="success-rate-item">
      <div class="success-rate flex">
        <p class="module-title">
          <img
            src="../../imgs/home/center_left_icon.png"
            alt=""
            class="icon-img"
          >
          <span :title="item.title">{{ item.title }}</span>
        </p>
        <p class="rate">
          <span>28.43</span>
          <span class="unit">%</span>
        </p>
      </div>
      <div class="number-of-times flex">
        <p>
          <span>启动成功次数</span>
        </p>
        <p>
          <span class="rate">2346</span>
          <span>次</span>
        </p>
      </div>
      <div class="number-of-times flex">
        <p>
          <span>启动未成功次数</span>
        </p>
        <p>
          <span class="rate">2346</span>
          <span>次</span>
        </p>
      </div>
      <div class="line" />
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'CenterLeft',
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      startTime: '',
      endTime: '',
      funcType: '', // 组织机构层级
      orgId: '', //  组织机构id
      typeList: [{
        title: 'FA启动成功率',
        successField: 'name1',
        failedFields: 'name2',
        percentageField: 'percentage1'
      }, {
        title: '动作成功率',
        successField: 'name3',
        failedFields: 'name4',
        percentageField: 'percentage2'
      }, {
        title: '接地故障选段成功率',
        successField: 'name5',
        failedFields: 'name6',
        percentageField: 'percentage3'
      }, {
        title: '选段成功率',
        successField: 'name7',
        failedFields: 'name8',
        percentageField: 'percentage4'
      }]

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
.center-left {
  min-width: 235px;
  width: 27.2%;
  height: 467px;
  position: absolute;
  left: 0;
  bottom: 19px;
  padding: 0 16px;
  border: 1px solid #177da2;
  // @include border_color("border_color_green1");
  .success-rate-item {
    position: relative;
    width: 100%;
    height: calc(100% / 4);
    color: #fff;
    padding: 16px 0 10px;
    box-sizing: border-box;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .success-rate {
      font-family: PangMenZhengDao;
      font-weight: 400;
     color: #fff;
      font-size: 16px;
      margin-bottom: 5px;
      .module-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon-img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
      }
      .rate {
        color:#23c4fd;
        font-size: 20px;
        .unit {
          font-size: 10px;
        }
      }
    }
    .number-of-times {
      padding-left: 19px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #b0d1fa;
      font-size: 14px;
      margin-bottom: 10px;
      .rate {
       color: #fff;
        font-size: 18px;
      }
    }
    .line {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        56deg,
        rgba(35, 196, 253, 0) 0%,
        rgba(35, 196, 253, 0.5) 50%,
        rgba(35, 196, 253, 0) 100%
      );
    }
  }
  .success-rate-item:nth-last-child(1) {
    border: none;
  }
}
</style>
