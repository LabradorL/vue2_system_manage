<template>
  <div class="middle-box-item">
    <img src="@/assets/images/test/middle_bg.png" class="img_bg1" alt>
    <img src="@/assets/images/test/middle_bg.svg" class="img_bg2" alt>
    <div class="middle-content">
      <div v-for="(item,idx) in 4" :key="item" :class="['middle-item-wrapper', `item${idx}`]">
        <div class="middle-item-box">
          <div class="middle-item-content">
            <div class="middle-item-count">423</div>
            <div class="data-unit">条</div>
          </div>
        </div>
        <div class="middle-item-label">label</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'EcharsMiddleTwo',
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // top: 100px;
  // height: calc(100% - 100px);
  height: 100%;
  .img_bg1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 80%;
  }

  .img_bg2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 50%;
  }

  .middle-content {
    width: 100%;
    height: 100%;
    position: relative;
    bottom: 20px;
    z-index: 10;
    box-sizing: border-box;
    .middle-item-wrapper {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      .middle-item-box {
        width: 140px;
        height: 121px;
        background: url("../../images/middle_item_bg1.svg") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .middle-item-content {
          width: 111px;
          height: 95px;
          background: url("../../images/middle_item_bg2.svg") no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .middle-item-count {
            font-size: 40px;
            color: #36cde6;
          }
          .data-unit {
            font-size: 12px;
            color: #36cde6;
          }
        }
      }
      .middle-item-label {
        width: 143px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: white;
        background: #0687af;
        font-size: 14px;
      }
    }
    .item0 {
      top: 110px;
      left: 205px;
      animation: item1Animation 1.5s linear infinite;
    }
    .item1 {
      top: 110px;
      right: 178px;
      animation: item1Animation 1.5s linear infinite;
    }
    .item2 {
      top: 370px;
      left: 75px;
      animation: item2Animation 1.5s linear infinite;
    }
    .item3 {
      top: 370px;
      right: 45px;
      animation: item2Animation 1.5s linear infinite;
    }

    @keyframes item1Animation {
      0% {
        transform: translate(0, 0px);
      }
      50% {
        transform: translate(0, -10px);
      }
      100% {
        transform: translate(0, 0px);
      }
    }

    @keyframes item2Animation {
      0% {
        transform: translate(0px, 0);
      }
      50% {
        transform: translate(0px, -10px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
  }
}
</style>
