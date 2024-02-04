<template>
  <div class="middle-box-item">
    <div class="middle-row">
      <div v-for="item in 6" :key="item" class="middle-col">
        <div class="middle-col-img-box">
          <img class="col-img" src="@/views/allPeopleCanBrowse/echars/images/api_bg.png">
          <img src="@/views/allPeopleCanBrowse/echars/images/api_icon.svg">
        </div>
        <div class="middle-col-info-box">
          <div class="middle-info-num">1231</div>
          <div class="middle-info-title">应用服务</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 组件名称
  name: 'EcharsMiddleFour',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 组件方法
  methods: {}
}
</script>

<style lang="scss" scoped>
.middle-box-item {
  width: 100%;
  height: 100%;
  .middle-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .middle-col {
      display: flex;
      align-items: center;
      margin-top: 30px;
      .middle-col-img-box {
         width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .col-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          animation: rotateA 1s linear infinite;
        }
      }
      .middle-col-info-box {
        margin-left: 10px;
        width: 145px;
        white-space: nowrap;
        .middle-info-num {
          font-weight: 700;
          color: #4df5b0;
          font-size: 36px;
          text-align: center;
        }
        .middle-info-title {
          font-weight: 400;
          color: #ffffff;
          font-size: 20px;
          text-align: center;
        }
      }
    }
  }
}
@keyframes rotateA {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
