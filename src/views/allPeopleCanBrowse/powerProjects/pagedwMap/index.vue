<template>
  <div id="contentBox" @click="barClick()">
    <!-- 思级地图(切换本地用) -->
    <gw-gis
      v-if="envVariable === 'development'"
      ref="gwGis"
      sg-map-key="4b9985a37eef391f9ff32c696819f605"
      sg-map-sn="ee7b92c92455300896b732377a662077"
      ms-service-url="http://25.55.39.140:21100"
      ms-key="bfda2c88a3b94d9ea0c2db36306283fc"
      ms-secret-key="cc8f9253-bd0a-4910-88e6-7f5add25aca8"
      :on-map-loaded="onMapLoaded"
    />
    <!-- 电网一张图(线上用)-->
    <dwGis v-else ref="dwGis" :on-map-loaded="onMapLoaded" />
    <!-- 顶部查询 -->
    <homeHead
      ref="homeHead"
      :func-type="activeFuncType"
      :org-id="activeOrgId"
      @dateChange="dateChange"
      @activeArea="activeArea"
      @deviceAbnormalTypeChange="deviceAbnormalTypeChange"
      @gisMap="queryDeviceByDeviceName"
    />
    <!--左侧看板 -->
    <abnormal-home-left
      ref="abnormalHomeLeft"
      :start-time-date="startTime"
      :end-time-date="endTime"
      :func-type="activeFuncType"
      :org-id="activeOrgId"
      @gisMap="newListMapPoint"
    />
     <!-- 右侧看板 -->
    <abnormal-home-right ref="abnormalHomeRight"></abnormal-home-right>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
// @import url("./index.scss");
@import "@/assets/styles/themes.scss";

.map-legend {
  width: 120px;
  height: 106px;
  position: absolute;
  right: 456px;
  bottom: 20px;
  background: #112e3c;
  @include background("background_color_legend");
  z-index: 999;
  .map-legend-head {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-size: 100% 100%;
    font-size: 16px;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    font-weight: 400;
    @include font_color("font_color_white");
    padding: 0 16px;
  }
  .map-legend-body {
    width: 100%;
    height: calc(100% - 30px);
    padding: 15px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #112945;
  }
  .map-legend-li {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    font-weight: 400;
    @include font_color("font_color_white");
    span {
      width: 12px;
      height: 12px;
      opacity: 1;
      border-radius: 50%;
      margin-right: 12px;
      position: relative;
    }
  }
  .map-legend-li-city {
    font-family: Microsoft YaHei;
    p {
      font-size: 12px;
    }
  }
  .map-legend-li:nth-child(1) span {
    @include background-color("font_color_yellow");
  }
  .map-legend-li:nth-child(2) span {
    @include background-color("font_color_blue");
  }
}
.map-legend-little {
  height: 130px;
  right: 20px;
  .map-legend-li {
    height: 36px;
    img {
      width: 34px;
      height: 36px;
    }
  }
}
.map-legend-little.device-type {
  width: 150px;
  height: 200px;
}

.abnormal-type-box {
  width: 90px;
  position: absolute;
  left: 456px;
  bottom: 20px;
  background: linear-gradient(
    180deg,
    rgba(4, 67, 121, 0.88) 0%,
    rgba(0, 24, 46, 0.85) 100%
  );
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px 4px 4px 4px;
  z-index: 10;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(21.43805254250765, 118.94447788596153, 255, 1),
      rgba(148.9380544424057, 212.57518529891968, 255, 1)
    )
    1 1;
  padding: 10px 20px;
}
.abnormal-type-box.width130 {
  width: 130px;
}
// 提示框
.hint-common {
  position: absolute;
  top: 20px;
  width: 360px;
  height: auto;
  background: #021736;
  box-shadow: inset 0px 0px 20px 0px rgba(35, 196, 253, 0.5);
  @include box_shadow("box_hint_shadow");
  z-index: 666;
  border-radius: 10px;
  padding: 20px;
  .hint-head {
    width: 100%;
    height: 14px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-weight: 700;
    @include font_color("font_color_white");
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
    @include font_color("font_color_gray");
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
    @include font_color("font_color_gray");
    line-height: 24px;
    padding: 16px;
    padding-bottom: 0px;
    span {
      @include font_color("font_color_blue");
    }
    p {
      margin-top: 16px;
    }
    p:nth-child(1) {
      margin-top: 0px;
    }
  }
}

::v-deep .el-checkbox-group {
  .el-checkbox {
    margin-bottom: 5px;
    .el-checkbox__label {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
    }
    .el-checkbox__inner {
      background: transparent;
      border-color: #17BEFC;
      @include border_color('font_color_blue')
    }
    .el-checkbox__input.is-checked {
      .el-checkbox__inner::after {
        @include border_color('font_color_blue')
      }
    }

  }
  .el-checkbox:nth-last-child(1) {
    margin-bottom: 0;
  }
}
</style>
