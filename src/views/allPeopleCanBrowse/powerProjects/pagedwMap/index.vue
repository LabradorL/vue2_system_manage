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
    />
    <!--左侧看板 -->
    <home-left ref="homeLeft" @gisMap="newListMapPoint"/>
     <!-- 右侧看板 -->
    <home-right ref="homeRight"></home-right>
    <!-- 打点的弹框 -->
    <point-dialog ref="pointDialog"></point-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" src='../css/map.scss'></style>
<style lang="scss" scoped>
@import url("./index.scss");
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
