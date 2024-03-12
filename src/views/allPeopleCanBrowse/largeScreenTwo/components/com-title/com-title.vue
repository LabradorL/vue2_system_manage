<template>
  <div class="cont-title-box">
    <div class="cont-title-head">
      <div class="cont-title-head-left">
        <img src="../../imgs/common/item-head-icon.png" alt="">
        <p class="cont-title-head-name">{{ titleName }}</p>
      </div>
      <div class="cont-title-head-right">
        <slot name="headRight" />
      </div>
    </div>
    <div :class="['cont-title-body', additionalBodyClass]">
      <slot name="titleBody" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titleName: {
      type: String,
      default: function() {
        return ''
      }
    },
    additionalBodyClass: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.cont-title-box {
  width: 100%;
  height: 100%;
  // border: 1px solid;
  // border-image: linear-gradient(42deg, rgba(161.34955644607544, 255, 248.94029796123505, 1), rgba(182.78761088848114, 255, 250.32745152711868, 0)) 1 1;
}
.cont-title-head {
  width: 100%;
  height: 36px;
  background: url("../../imgs/common/item_module_bg.png") no-repeat;
  background-size: 100% auto;
  background-position-y: 100%;
  padding: 0 20px 0 15px;
  display: flex;
  justify-content: space-between;
}
.cont-title-head-all {
  width: 100%;
  height: 36px;
  background: url("../../imgs/common/item_module_bg2.png") no-repeat;
  background-size: 100% auto;
  background-position-y: 100%;
  padding: 0 20px 0 15px;
}
.cont-title-head-left {
  display: flex;
  align-items: center;
  width: 70%;
  line-height: 36px;
  img {
    width: auto;
    height: 24px;
    margin-right: 12px;
  }
  .cont-title-head-name {
    font-size: 22px;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    font-weight: 400;
    color: #FFFFFF;
  }
}

.cont-title-head-right {
  color: #23c4fd;
  //   width: 30%;
  //   float: right;
  text-align: right;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 12px;
    height: 10.8px;
  }
  img.head-hint {
    width: 16px;
    height: 16px;
  }
}
.cont-title-body {
  width: 100%;
  height: calc(100% - 36px);
  padding: 16px 20px;
  background: linear-gradient(
        270deg,
        rgba(0, 29, 54, 0.6) 0%,
        rgba(17, 64, 107, 0.2) 100%
      );
  box-shadow: inset 0px 0px 40px 0px rgba(0, 111, 255, 0.2);
  border-radius: 0px 0px 10px 10px;
}
.title-body {
  padding: 16px 20px 18px;
}
</style>
