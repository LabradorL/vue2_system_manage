<template>
  <div id="diversionAnalysis" @click="barClick">
    <!-- 顶部查询 -->
    <homeHead
      ref="homeHead"
      @activeArea="activeArea"
    />
    <!-- 中间部分 -->
    <div class="center-box">
      <div class="cener-top">
        <!-- 中间地图 -->
        <mapEchart ref="mapEchart" />
        <!-- 中间地图的右边 -->
        <center-right ref="centerRight" />
        <!-- 中间地图的左边 -->
        <center-left ref="centerLeft" />
      </div>
      <center-bottom ref="centerBottom" />
    </div>
    <!-- 左侧看板 -->
    <home-left ref="homeLeft" />
    <!-- 右侧看板 -->
    <home-right ref="homeRight" />
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
